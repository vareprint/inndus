import { getConnection } from '@/app/lib/db';
import fs from 'fs/promises';
import path from 'path';


export async function GET() {
  try {
    const connection = await getConnection();

    const [products] = await connection.query(`SELECT * FROM product ORDER BY seq ASC`);
    const [subproducts] = await connection.query('SELECT * FROM sub_product');

    return Response.json({
      products,
      subproducts
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return Response.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const pname = formData.get('pname');
    const pdesc = formData.get('pdesc');
    const file = formData.get('pimage');

    let imageName = null;

    // ✅ Save image to /public/image
    if (file && typeof file === 'object') {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const ext = path.extname(file.name); // get file extension
      imageName = `${timestamp}${ext}`;
      const uploadPath = path.join(process.cwd(), 'public/image', imageName);

      await fs.mkdir(path.dirname(uploadPath), { recursive: true }); // ensure folder exists
      await fs.writeFile(uploadPath, buffer);
    }

    const connection = await getConnection();

    const [result] = await connection.query(
      'INSERT INTO product (pname, pdesc, pimage) VALUES (?, ?, ?)',
      [pname, pdesc, imageName]
    );

    return Response.json({ message: 'Product added', insertId: result.insertId });
  } catch (err) {
    console.error('Upload error:', err);
    return Response.json({ error: 'Error uploading product' }, { status: 500 });
  }
}



