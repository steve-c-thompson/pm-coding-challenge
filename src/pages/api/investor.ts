import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { IncomingForm } from "formidable";
import prisma from "@/db";

// Need this for reading multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

async function safeMkdir(filePath: string) {
  if (!existsSync(filePath)) {
    await mkdir(filePath, { recursive: true });
  }
}

// TODO: validate data
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const uploadFolder = path.join("/tmp", "investors", "files");

  await safeMkdir(uploadFolder);

  const form = new IncomingForm({
    uploadDir: uploadFolder,
  });

  let fields, files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to parse form data" });
  }

  // Create the file path
  let fp = uploadFolder;
  if (files && files.file! && files.file[0]) {
    fp = files!.file[0]!.filepath;
  }
  const id = await prisma.investor.create({
    data: {
      firstName: fields!.firstName![0],
      lastName: fields!.lastName![0],
      dateOfBirth: fields!.dateOfBirth![0],
      phoneNumber: fields!.phoneNumber![0],
      streetAddress: fields!.streetAddress![0],
      state: fields!.state![0],
      zipCode: fields!.zipCode![0],
      fileLocation: fp
    },
  });

  
  res.status(200).json({ investor: id, msg: `File created at ${fp}` });
}
