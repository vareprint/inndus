// src/app/api/subproduct/route.js
import { getConnection } from '@/app/lib/db';

export async function POST(req) {
  try {
    const body = await req.json(); // ✅ Read JSON body
    const { product } = body;

    const connection = await getConnection();

    const [rows] = await connection.query(
      'SELECT * FROM sub_product WHERE pid = ? ORDER BY sid DESC',
      [product]
    );

    return Response.json(rows);
  } catch (err) {
    console.error('Fetch error:', err);
    return Response.json({ error: 'Error fetching sub-products' }, { status: 500 });
  }
}
