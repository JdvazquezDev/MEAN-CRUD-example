const Employee = require('../models/employee');

const employeeCtrl = {};

// Return all employees
employeeCtrl.getEmployees = async(req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

// Create a new employee
employeeCtrl.createEmployee = async(req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({
        "status": 'Employee saved'
    });
}

// Get a employee
employeeCtrl.getEmployee = async(req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

// Edit a employee
employeeCtrl.editEmployee = async(req, res) => {
    const {
        id
    } = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }
    await Employee.findByIdAndUpdate(id, {
        $set: employee
    }, {
        new: true
    });
    res.json({
        status: 'Employee edit'
    });
}

// Delete a employee
employeeCtrl.deleteEmployee = async(req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Employee deleted'
    });

}

module.exports = employeeCtrl;