const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const Op = Sequelize.Op

const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
  dialect: 'mysql'
})

const StudyGroup = sequelize.define('studyGroup', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  type: {
    type: Sequelize.ENUM,
    values: [ 'WORKSHOP', 'THEORETICAL' ],
    allowNull: false
  }
})

const Student = sequelize.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 40]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

StudyGroup.hasMany(Student)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

// get /study-groups?filter=a&page=2&pageSize=5
app.get('/study-groups', async (req, res, next) => {
  const query = {
    where : {}
  }
  if (req.query.filter) {
    query.where.description = {
      [Op.like]: `%${req.query.filter}%`
    }
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page)
    query.limit = pageSize
    query.offset = pageSize * page
  }
  try {
    const studyGroups = await StudyGroup.findAll(query)
    res.status(200).json(studyGroups)
  } catch (err) {
    next(err)
  }
})

app.post('/study-groups', async (req, res, next) => {
  try {
    await StudyGroup.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/study-groups/:sgid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      res.status(200).json(studyGroup)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/study-groups/:sgid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      await studyGroup.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/study-groups/:sgid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      await studyGroup.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/study-groups/:sgid/students', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid, {
      include: [ Student ]
    })
    if (studyGroup) {
      res.status(200).json(studyGroup.students)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/study-groups/:sgid/students', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      const student = new Student(req.body)
      student.studyGroupId = studyGroup.id
      await student.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/study-groups/:sgid/students/:sid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      const students = await studyGroup.getStudents({ id:  req.params.sid })
      const student = students.shift()
      if (student) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/study-groups/:sgid/students/:sid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      const students = await studyGroup.getStudents({ id:  req.params.sid })
      const student = students.shift()
      if (student) {
        student.name = req.body.name
        student.email = req.body.email
        await student.save()
        res.status(202).json({ message: 'accepted'})
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/study-groups/:sgid/students/:sid', async (req, res, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(req.params.sgid)
    if (studyGroup) {
      const students = await studyGroup.getStudents({ id:  req.params.sid })
      const student = students.shift()
      if (student) {
        await student.destroy()
        res.status(202).json({ message: 'accepted'})
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error ' })
})

app.listen(8080)