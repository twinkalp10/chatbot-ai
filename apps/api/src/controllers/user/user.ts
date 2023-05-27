import db from "../../configs/db.config"
import { comparePassword, createJWT, hashPassword } from "../../helper/auth.helper"
import { Req, Res } from "../../type"


export const createNewUser = async (req: Req, res: Res) => {
 const { name, email, password } = req.body
 try {
  const user = await db.user.create({
   data: {
    name: name ?? '',
    email,
    password: hashPassword(password)
   }
  })
  const token = createJWT(user)
  res.send({ token, success: true })
 } catch (err) {
  res.status(401).send({ message: 'User already exist', success: false, })
 }
}

export const loginUser = async (req: Req, res: Res) => {
 const { email, password } = req.body
 try {

  const user = await db.user.findUnique({
   where: { email }
  })
  if (!user) {
   return res.status(404).send({ message: 'User not found', success: false })
  }
  if (!user.password) {
   return res.status(401).send({ message: 'Invalid credentials', success: false })
  }
  const valid = comparePassword(password, user.password)
  if (!valid) {
   return res.status(401).send({ message: 'Invalid credentials', success: false })
  }
  const token = createJWT(user)
  res.status(200).send({ token })
 } catch (e) {
  console.log(e)
  res.status(401).send({ message: 'Invalid credentials', success: false })
 }
}

export const updateUserName = async (req: Req, res: Res) => {
 const { name } = req.body
 const user = req?.user;
 if (user) {
  const updatedUser = await db.user.update({
   where: { id: user.id },
   data: {
    name,
   }
  })
  return res.send({ data: updatedUser })
 }
 return res.status(401).send({ message: 'Invalid credentials', success: false })
}

export const updateUserPassword = async (req: Req, res: Res) => {
 const { password, newPassword } = req.body
 const user = req?.user;
 if (user) {
  const valid = comparePassword(password, user.password)
  if (!valid) {
   return res.status(401).send({ message: 'Invalid credentials', success: false })
  }
  const updatedUser = await db.user.update({
   where: { id: user.id },
   data: {
    password: hashPassword(newPassword),
   }
  })
  return res.send({ data: updatedUser })
 }
 return res.status(401).send({ message: 'Invalid credentials', success: false })
}

export const getUser = async (req: Req, res: Res) => {
 const user = req?.user;
 if (user?.id) {
  const userExist = await db.user.findUnique({
   where: { id: user.id }
  })
  if (!userExist) {
   return res.status(401).send({ message: 'Invalid credentials', success: false })
  }

  return res.send({ data: user })
 }
 return res.status(401).send({ message: 'Invalid credentials', success: false })

}
