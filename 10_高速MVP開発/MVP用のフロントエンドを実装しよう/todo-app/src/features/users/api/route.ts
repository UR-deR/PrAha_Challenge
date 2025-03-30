import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { getDatabase } from '~/lib/drizzle/get-database';
import { posts, users } from '~/lib/drizzle/schema';

const app = new Hono()
  .get('/', async (c) => {
    const database = getDatabase();
	const result = await database.select().from(users);            
    return c.json({ userList: result }, 200);
  })
  .get('/:userId', async (c) => {
   		const { userId } = c.req.param()

	  const database = getDatabase();
	  const res = await database
		.select()
		  .from(users).where(
			eq(users.id, userId),
	  )
	  
	  const user = {
		  email: res[0].email,
		  name: res[0].name,
		  username: res[0].username,
	  }

	return c.json({ user }, 200)
   
  })
  .get('/:userId/posts', async (c) => {
	const { userId } = c.req.param()
	
	const database = getDatabase();
	  const res = await database.select().from(posts).where(
		eq(posts.userId, userId),
	  )

	return c.json({ posts: res }, 200)
  });

export default app;
