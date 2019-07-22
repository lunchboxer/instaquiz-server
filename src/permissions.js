const { rule, shield } = require('graphql-shield')
const { getUserId } = require('./utils')

// Rules
const isAuthenticatedUser = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return Boolean(userId)
})

const isTeacher = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return context.prisma.$exists.user({ id: userId, role: 'Teacher' })
})

// Permissions

exports.permissions = shield({
  Query: {
    me: isAuthenticatedUser
  },
  Mutation: {
    createTerm: isTeacher,
    updateTerm: isTeacher,
    deleteTerm: isTeacher,
    createCourse: isTeacher,
    deleteCourse: isTeacher
  }
})
