import { getConnection } from '@/app/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const pid = formData.get('pid');
    const pname = formData.get('pname');
    const pdesc = formData.get('pdesc');
    const min_qty = formData.get('min_qty');
    const price = formData.get('price');
    const file = formData.get('pimage');

    let imageName = null;

    if (file && typeof file === 'object') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const ext = path.extname(file.name);
      imageName = `${timestamp}${ext}`;
      const uploadPath = path.join(process.cwd(), 'public/image/subproduct', imageName);

      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);
    }

    const connection = await getConnection();
    const [result] = await connection.query(
      `INSERT INTO sub_product (pid, sname, sdesc, min_qty, price, simage)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [pid, pname, pdesc, min_qty, price, imageName]
    );

    return Response.json({ message: 'Sub Product inserted', id: result.insertId });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Insertion failed' }, { status: 500 });
  }
}
