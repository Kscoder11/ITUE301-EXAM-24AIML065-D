// seed.js — One-time database seeder
// Run: node seed.js
// Creates 3 employees (one per role) + 4 leave types
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Employee = require('./models/Employee');
const LeaveType = require('./models/LeaveType');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await Employee.deleteMany({});
  await LeaveType.deleteMany({});

  // Hash a common password for demo
  const hash = await bcrypt.hash('password123', 10);

  // Seed employees — one per role
  const employees = await Employee.insertMany([
    { name: 'Krish Singh',  email: 'krish@techsolutions.com',  password: hash, department: 'Engineering', designation: 'Developer',  role: 'employee' },
    { name: 'Amit Patel',   email: 'amit@techsolutions.com',   password: hash, department: 'Engineering', designation: 'Team Lead',  role: 'manager'  },
    { name: 'Priya Sharma', email: 'priya@techsolutions.com',  password: hash, department: 'HR',          designation: 'HR Manager', role: 'hr'       }
  ]);

  // Seed leave types
  const leaveTypes = await LeaveType.insertMany([
    { name: 'Casual',  maxDaysPerYear: 12 },
    { name: 'Sick',    maxDaysPerYear: 10 },
    { name: 'Earned',  maxDaysPerYear: 15 },
    { name: 'CompOff', maxDaysPerYear: 5  }
  ]);

  console.log('Seeded employees:', employees.map(e => `${e.name} (${e.role})`));
  console.log('Seeded leave types:', leaveTypes.map(t => t.name));
  console.log('\nLogin credentials for all users:');
  console.log('  Password: password123');
  employees.forEach(e => console.log(`  ${e.role.padEnd(8)} → ${e.email}`));

  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
