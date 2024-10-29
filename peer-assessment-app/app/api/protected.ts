import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

async function handler(req:NextApiRequest, res:NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return res.json({
    message: "Success",
    user: {
      id: session.user.id,
      name: session.user.name,
      role: session.user.role,
    },
  });
}

export {handler as GET, handler as POST};