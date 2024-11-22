from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habit_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Habit model to represent habits in the database
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    frequency = db.Column(db.Integer, nullable=False)

# HabitLog model to represent habit logs in the database
class HabitLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habit.id'), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    habit = db.relationship('Habit', backref=db.backref('logs', lazy=True))

# API Route to get all habits
@app.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()
    habit_list = [{'id': habit.id, 'name': habit.name, 'description': habit.description, 'frequency': habit.frequency} for habit in habits]
    return jsonify(habit_list)

# API Route to add a new habit
@app.route('/habits', methods=['POST'])
def add_habit():
    data = request.get_json()
    new_habit = Habit(name=data['name'], description=data.get('description', ''), frequency=data['frequency'])
    db.session.add(new_habit)
    db.session.commit()
    return jsonify({'message': 'Habit added successfully', 'id': new_habit.id}), 201

# API Route to get all habit logs
@app.route('/habitlogs', methods=['GET'])
def get_habit_logs():
    habit_logs = HabitLog.query.all()
    log_list = [{'id': log.id, 'habit_id': log.habit_id, 'date': log.date} for log in habit_logs]
    return jsonify(log_list)

# API Route to add a new habit log
@app.route('/habitlogs', methods=['POST'])
def add_habit_log():
    data = request.get_json()
    new_log = HabitLog(habit_id=data['habit_id'], date=data['date'])
    db.session.add(new_log)
    db.session.commit()
    return jsonify({'message': 'Habit log added successfully', 'id': new_log.id}), 201

def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True, port=8000)
