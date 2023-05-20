import db from "../../configs/db.config"
import { Req, Res } from "../../type"

export const getAllWebsite = async (req: Req, res: Res) => {
 const websites = await db.website.findMany({
  where: {
   userId: req?.user?.id
  }
 })
 res.send({ data: websites, success: true })
}

export const addWebsite = async (req: Req, res: Res) => {
 const { name, url } = req.body
 const userId = req?.user?.id
 if (userId) {

  const website = await db.website.create({
   data: {
    name,
    url,
    userId
   }
  })
  res.send({ data: website, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const updateWebsite = async (req: Req, res: Res) => {
 const { name, url } = req.body
 const { id } = req.params
 const userId = req?.user?.id
 if (!id) {
  return res.status(401).send({ message: "Please send website Id", success: false })
 }
 if (userId) {
  const website = await db.website.update({
   where: {
    id_userId: {
     userId,
     id
    }
   },
   data: {
    name,
    url
   }
  })
  res.send({ data: website, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}

export const deleteWebsite = async (req: Req, res: Res) => {
 const { id } = req.params
 const userId = req?.user?.id
 if (userId) {
  const website = await db.website.delete({
   where: {
    id_userId: {
     userId,
     id
    }
   }
  })
  res.send({ data: website, success: true })
 } else {
  return res.status(401).send({ message: "Unauthorized" })
 }
}
