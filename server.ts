import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import fs from "fs";

const app = express();
const PORT = 3000;

// Enable JSON body parsing and CORS
app.use(express.json());
app.use(cors());

// --- Pure JS File-Backed DB Setup ---
const DB_FILE = "eunoiaverse.db";

interface DbSchema {
  posts: Array<{
    id: number;
    user: string;
    content: string;
    image: string | null;
    likes: number;
    timestamp: string;
    poll?: {
      question: string;
      options: Array<{ id: number; text: string; votes: number }>;
    } | null;
  }>;
  comments: Array<{
    id: number;
    postId: number;
    user: string;
    content: string;
    timestamp: string;
  }>;
  stories: Array<{
    id: number;
    user: string;
    avatar: string;
    image: string;
    caption: string;
    timestamp: string;
  }>;
  following: string[];
  profile: {
    name: string;
    location: string;
    bio: string;
    avatar: string;
    themeColor: string;
    pushNotifications: boolean;
    ambientAutoplay: boolean;
  };
  chats: Array<{
    id: number;
    fromUser: string;
    toUser: string;
    content: string;
    timestamp: string;
  }>;
  reflections: Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    mood: string;
    createdAt: string;
  }>;
  meta: {
    nextPostId: number;
    nextCommentId: number;
    nextStoryId: number;
    nextChatId: number;
  };
}

// Read database or initialize
const readDb = (): DbSchema => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8").trim();
      if (data.startsWith("{")) {
        const parsed = JSON.parse(data);
        if (!parsed.stories) parsed.stories = [];
        if (!parsed.following) parsed.following = ["Sarah J.", "Alex Rivera", "Maria K."];
        if (!parsed.chats) {
          parsed.chats = [
            {
              id: 1,
              fromUser: "Sarah J.",
              toUser: "Edo Erpani",
              content: "Halo Edo! Selamat datang di aplikasi Pesona Kutai Barat. Ada rencana berkunjung ke Jembatan Aji Tulur Jejangkat pekan ini?",
              timestamp: "Kemarin"
            },
            {
              id: 2,
              fromUser: "Edo Erpani",
              toUser: "Sarah J.",
              content: "Halo Sarah! Iya nih, rencana mau foto sunset di sana sore ini.",
              timestamp: "Kemarin"
            }
          ];
        }
        if (!parsed.profile) {
          parsed.profile = {
            name: "Edo Erpani",
            location: "Kutai Barat, Kalimantan Timur",
            bio: "Penggiat pesona alam & budaya Kutai Barat. Suka berkelana menyusuri Sungai Mahakam dan mengabadikan kehidupan suku Dayak.",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
            themeColor: "blue",
            pushNotifications: true,
            ambientAutoplay: false
          };
        }
        if (!parsed.reflections) {
          parsed.reflections = [
            {
              id: "dump-1",
              title: "The Present Anchor",
              content: "My mind is calm, my breathing is steady, and I am entirely present in this moment. The future will wait; the past has gone; this second is mine.",
              category: "affirmation",
              mood: "Calm",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-2",
              title: "Acceptance of Uncontrolled Current",
              content: "I release the heavy anchor of needing to control everything. Like a leaf on a serene river, I flow with the natural changes of life, trusting the journey.",
              category: "reflection",
              mood: "Calm",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-3",
              title: "Morning Light Intention",
              content: "Today, I intend to observe instead of react. I will give myself three slow breaths before responding to stressful elements, cultivating space for wisdom.",
              category: "intention",
              mood: "Inspired",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-4",
              title: "Gratitude for the Senses",
              content: "Deeply grateful for the cold air on my face, the rich scent of morning tea, and the subtle, rhythmic pulse of life within me. Simple beauties are the grandest.",
              category: "gratitude",
              mood: "Reflective",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-5",
              title: "Reframing Imperfection",
              content: "Imperfection is not failure; it is the unique texture of growth. Every crack in my journey is where the light of learning enters, making me whole.",
              category: "reframed",
              mood: "Reflective",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-6",
              title: "Quiet Strength",
              content: "In the middle of noise, my silence is not weakness—it is a reservoir of absolute power. I carry an inner sanctuary of quiet wherever I step today.",
              category: "affirmation",
              mood: "Calm",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-7",
              title: "The Grace of Pacing",
              content: "I do not have to run to be successful. Moving slowly, intentionally, and deliberately is a beautiful way to live. I honor my own unique rhythm.",
              category: "reflection",
              mood: "Reflective",
              createdAt: "2026-07-12T14:58:09.389Z"
            },
            {
              id: "dump-8",
              title: "Radical Kindness Intention",
              content: "My intention for this day is to speak to myself with the exact same tenderness, patience, and warmth that I would offer to a beloved child.",
              category: "intention",
              mood: "Inspired",
              createdAt: "2026-07-12T14:58:09.389Z"
            }
          ];
        }
        if (!parsed.meta) parsed.meta = { nextPostId: 1, nextCommentId: 1, nextStoryId: 1, nextChatId: 3 };
        if (!parsed.meta.nextStoryId) parsed.meta.nextStoryId = parsed.stories.length + 1;
        if (!parsed.meta.nextChatId) parsed.meta.nextChatId = parsed.chats.length + 1;
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading database file, initializing clean state:", e);
  }
  
  const initial: DbSchema = {
    posts: [],
    comments: [],
    stories: [],
    following: ["Sarah J.", "Alex Rivera", "Maria K."],
    profile: {
      name: "Edo Erpani",
      location: "Kutai Barat, Kalimantan Timur",
      bio: "Penggiat pesona alam & budaya Kutai Barat. Suka berkelana menyusuri Sungai Mahakam dan mengabadikan kehidupan suku Dayak.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
      themeColor: "blue",
      pushNotifications: true,
      ambientAutoplay: false
    },
    chats: [
      {
        id: 1,
        fromUser: "Sarah J.",
        toUser: "Edo Erpani",
        content: "Halo Edo! Selamat datang di aplikasi Pesona Kutai Barat. Ada rencana berkunjung ke Jembatan Aji Tulur Jejangkat pekan ini?",
        timestamp: "Kemarin"
      },
      {
        id: 2,
        fromUser: "Edo Erpani",
        toUser: "Sarah J.",
        content: "Halo Sarah! Iya nih, rencana mau foto sunset di sana sore ini.",
        timestamp: "Kemarin"
      }
    ],
    reflections: [
      {
        id: "dump-1",
        title: "The Present Anchor",
        content: "My mind is calm, my breathing is steady, and I am entirely present in this moment. The future will wait; the past has gone; this second is mine.",
        category: "affirmation",
        mood: "Calm",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-2",
        title: "Acceptance of Uncontrolled Current",
        content: "I release the heavy anchor of needing to control everything. Like a leaf on a serene river, I flow with the natural changes of life, trusting the journey.",
        category: "reflection",
        mood: "Calm",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-3",
        title: "Morning Light Intention",
        content: "Today, I intend to observe instead of react. I will give myself three slow breaths before responding to stressful elements, cultivating space for wisdom.",
        category: "intention",
        mood: "Inspired",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-4",
        title: "Gratitude for the Senses",
        content: "Deeply grateful for the cold air on my face, the rich scent of morning tea, and the subtle, rhythmic pulse of life within me. Simple beauties are the grandest.",
        category: "gratitude",
        mood: "Reflective",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-5",
        title: "Reframing Imperfection",
        content: "Imperfection is not failure; it is the unique texture of growth. Every crack in my journey is where the light of learning enters, making me whole.",
        category: "reframed",
        mood: "Reflective",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-6",
        title: "Quiet Strength",
        content: "In the middle of noise, my silence is not weakness—it is a reservoir of absolute power. I carry an inner sanctuary of quiet wherever I step today.",
        category: "affirmation",
        mood: "Calm",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-7",
        title: "The Grace of Pacing",
        content: "I do not have to run to be successful. Moving slowly, intentionally, and deliberately is a beautiful way to live. I honor my own unique rhythm.",
        category: "reflection",
        mood: "Reflective",
        createdAt: "2026-07-12T14:58:09.389Z"
      },
      {
        id: "dump-8",
        title: "Radical Kindness Intention",
        content: "My intention for this day is to speak to myself with the exact same tenderness, patience, and warmth that I would offer to a beloved child.",
        category: "intention",
        mood: "Inspired",
        createdAt: "2026-07-12T14:58:09.389Z"
      }
    ],
    meta: { nextPostId: 1, nextCommentId: 1, nextStoryId: 1, nextChatId: 3 }
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
  return initial;
};

const writeDb = (data: DbSchema) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing to database:", e);
  }
};

// Helper functions to execute SQL with Promises (simulated pure JS)
const dbRun = async (sql: string, params: any[] = []): Promise<{ lastID?: number; changes?: number }> => {
  const dbData = readDb();
  const normalizedSql = sql.trim().replace(/\s+/g, " ").toLowerCase();

  if (normalizedSql.includes("create table")) {
    return { changes: 0 };
  }

  if (normalizedSql.includes("insert into posts")) {
    let user = "Anonymous";
    let content = "";
    let image: string | null = null;
    let likes = 0;
    let timestamp = "Just now";

    if (params.length === 5) {
      [user, content, image, likes, timestamp] = params;
    } else if (params.length === 4) {
      [user, content, image, timestamp] = params;
      likes = 0;
    }

    const id = dbData.meta.nextPostId++;
    dbData.posts.push({
      id,
      user,
      content,
      image,
      likes,
      timestamp
    });

    writeDb(dbData);
    return { lastID: id, changes: 1 };
  }

  if (normalizedSql.includes("insert into comments")) {
    const [postId, user, content, timestamp] = params;
    const id = dbData.meta.nextCommentId++;
    dbData.comments.push({
      id,
      postId: Number(postId),
      user,
      content,
      timestamp
    });

    writeDb(dbData);
    return { lastID: id, changes: 1 };
  }

  if (normalizedSql.includes("update posts set content")) {
    const [content, id] = params;
    const post = dbData.posts.find(p => p.id === Number(id));
    if (post) {
      post.content = content;
      writeDb(dbData);
      return { changes: 1 };
    }
    return { changes: 0 };
  }

  if (normalizedSql.includes("update posts set likes")) {
    const [change, id] = params;
    const post = dbData.posts.find(p => p.id === Number(id));
    if (post) {
      post.likes = Math.max(0, post.likes + Number(change));
      writeDb(dbData);
      return { changes: 1 };
    }
    return { changes: 0 };
  }

  return { changes: 0 };
};

const dbAll = async (sql: string, params: any[] = []): Promise<any[]> => {
  const dbData = readDb();
  const normalizedSql = sql.trim().replace(/\s+/g, " ").toLowerCase();

  if (normalizedSql.includes("select count(*)")) {
    return [{ count: dbData.posts.length }];
  }

  if (normalizedSql.includes("select * from posts")) {
    return [...dbData.posts].sort((a, b) => b.id - a.id);
  }

  if (normalizedSql.includes("select * from comments")) {
    return [...dbData.comments].sort((a, b) => a.id - b.id);
  }

  if (normalizedSql.includes("select likes from posts")) {
    const [id] = params;
    const post = dbData.posts.find(p => p.id === Number(id));
    return post ? [{ likes: post.likes }] : [];
  }

  return [];
};

// Initialize schema
const initDb = async () => {
  try {
    // Create Posts Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT,
        likes INTEGER DEFAULT 0,
        timestamp TEXT NOT NULL
      )
    `);

    // Create Comments Table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER NOT NULL,
        user TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
      )
    `);

    // Seed default posts if empty
    const checkPosts = await dbAll("SELECT COUNT(*) as count FROM posts");
    if (checkPosts[0]?.count === 0) {
      console.log("Seeding database with default posts...");
      
      const res1 = await dbRun(
        "INSERT INTO posts (user, content, image, likes, timestamp) VALUES (?, ?, ?, ?, ?)",
        [
          "Sarah J.",
          "Just landed in the Eunoiaverse! The design here is incredible. ✨",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
          24,
          "2h ago"
        ]
      );

      await dbRun(
        "INSERT INTO posts (user, content, image, likes, timestamp) VALUES (?, ?, ?, ?, ?)",
        [
          "Edo Erpani",
          "Major platform update: Neumorphic v2.0 is now live for all creators!",
          null,
          156,
          "5h ago"
        ]
      );

      if (res1.lastID) {
        await dbRun(
          "INSERT INTO comments (postId, user, content, timestamp) VALUES (?, ?, ?, ?)",
          [
            res1.lastID,
            "Alex Rivera",
            "Welcome! Hope you love it here.",
            "1h ago"
          ]
        );
      }
    }
    
    // Seed default stories if empty
    const dbData = readDb();
    if (dbData.stories.length === 0) {
      console.log("Seeding database with default stories...");
      dbData.stories = [
        {
          id: dbData.meta.nextStoryId++,
          user: "Sarah J.",
          avatar: "https://placehold.co/100?text=Sarah",
          image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
          caption: "Indahnya Jembatan Aji Tulur Jejangkat Kutai Barat! Sunrise di hulu Mahakam 🌅",
          timestamp: "2j yang lalu"
        },
        {
          id: dbData.meta.nextStoryId++,
          user: "Alex Rivera",
          avatar: "https://placehold.co/100?text=Alex",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
          caption: "Menyusuri Sungai Mahakam menuju perkampungan Dayak Muara Pahu 🛶💨",
          timestamp: "5j yang lalu"
        },
        {
          id: dbData.meta.nextStoryId++,
          user: "Maria K.",
          avatar: "https://placehold.co/100?text=Maria",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
          caption: "Menatap keindahan Cagar Alam Kersik Luway. Anggrek Hitam bermekaran! 🌸🖤",
          timestamp: "12j yang lalu"
        }
      ];
      writeDb(dbData);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Start database initialization
initDb();

// --- REST API OVER SQL ---

// Get all stories
app.get("/api/stories", (req, res) => {
  try {
    const dbData = readDb();
    const storiesWithReactions = dbData.stories.map(s => ({
      ...s,
      reactions: s.reactions || { "❤️": 0, "🔥": 0, "👏": 0, "😂": 0, "😮": 0, "🙌": 0 }
    }));
    res.json(storiesWithReactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new story
app.post("/api/stories", (req, res) => {
  const { user, avatar, image, caption } = req.body;
  if (!image) {
    return res.status(400).json({ error: "Image is required for stories" });
  }

  try {
    const dbData = readDb();
    const newStory = {
      id: dbData.meta.nextStoryId++,
      user: user || "Edo Erpani",
      avatar: avatar || "https://placehold.co/100?text=Edo",
      image,
      caption: caption || "",
      timestamp: "Baru saja",
      reactions: { "❤️": 0, "🔥": 0, "👏": 0, "😂": 0, "😮": 0, "🙌": 0 }
    };
    dbData.stories.push(newStory);
    writeDb(dbData);
    res.status(201).json(newStory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// React to a story
app.post("/api/stories/:id/react", (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;

  if (!emoji) {
    return res.status(400).json({ error: "Emoji is required" });
  }

  try {
    const dbData = readDb();
    const story = dbData.stories.find(s => s.id === Number(id));
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    if (!story.reactions) {
      story.reactions = { "❤️": 0, "🔥": 0, "👏": 0, "😂": 0, "😮": 0, "🙌": 0 };
    }

    story.reactions[emoji] = (story.reactions[emoji] || 0) + 1;
    writeDb(dbData);

    const updatedStory = {
      ...story,
      reactions: story.reactions
    };

    res.json(updatedStory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts (with comments)
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await dbAll("SELECT * FROM posts ORDER BY id DESC");
    const comments = await dbAll("SELECT * FROM comments ORDER BY id ASC");

    const merged = posts.map((post) => ({
      ...post,
      image: post.image || null,
      comments: comments
        .filter((c) => c.postId === post.id)
        .map((c) => ({
          id: c.id,
          user: c.user,
          content: c.content,
          timestamp: c.timestamp,
        })),
    }));

    res.json(merged);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  const { user, content, image, poll } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const timestamp = new Date().toISOString();
    const result = await dbRun(
      "INSERT INTO posts (user, content, image, likes, timestamp) VALUES (?, ?, ?, 0, ?)",
      [user || "Anonymous", content.trim(), image || null, timestamp]
    );

    const newPostId = result.lastID;
    let savedPoll = null;

    if (poll && poll.question && Array.isArray(poll.options)) {
      const dbData = readDb();
      const createdPost = dbData.posts.find(p => p.id === newPostId);
      if (createdPost) {
        savedPoll = {
          question: poll.question.trim(),
          options: poll.options
            .filter((opt: string) => opt && opt.trim() !== "")
            .map((opt: string, index: number) => ({
              id: index + 1,
              text: opt.trim(),
              votes: 0
            }))
        };
        createdPost.poll = savedPoll;
        writeDb(dbData);
      }
    }

    res.status(201).json({
      id: newPostId,
      user: user || "Anonymous",
      content: content.trim(),
      image: image || null,
      likes: 0,
      timestamp,
      comments: [],
      poll: savedPoll
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vote in a poll
app.post("/api/posts/:id/poll/vote", async (req, res) => {
  const { id } = req.params;
  const { optionId } = req.body;

  try {
    const dbData = readDb();
    const post = dbData.posts.find(p => p.id === Number(id));
    if (!post || !post.poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const option = post.poll.options.find((opt: any) => opt.id === Number(optionId));
    if (!option) {
      return res.status(400).json({ error: "Option not found" });
    }

    option.votes = (option.votes || 0) + 1;
    writeDb(dbData);

    res.json({ success: true, poll: post.poll });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing post (Edit)
app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    await dbRun("UPDATE posts SET content = ? WHERE id = ?", [content.trim(), id]);
    res.json({ success: true, id: Number(id), content: content.trim() });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Like/Unlike a post
app.post("/api/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  const { increment } = req.body; // true to increment, false to decrement

  try {
    const change = increment ? 1 : -1;
    await dbRun("UPDATE posts SET likes = MAX(0, likes + ?) WHERE id = ?", [change, id]);

    // Fetch updated likes
    const rows = await dbAll("SELECT likes FROM posts WHERE id = ?", [id]);
    res.json({ success: true, likes: rows[0]?.likes || 0 });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a post
app.post("/api/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { user, content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const timestamp = new Date().toISOString();
    const result = await dbRun(
      "INSERT INTO comments (postId, user, content, timestamp) VALUES (?, ?, ?, ?)",
      [id, user || "Anonymous", content.trim(), timestamp]
    );

    res.status(201).json({
      id: result.lastID,
      postId: Number(id),
      user: user || "Anonymous",
      content: content.trim(),
      timestamp,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- USER PROFILE & SETTINGS ---
app.get("/api/profile", (req, res) => {
  try {
    const dbData = readDb();
    res.json(dbData.profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/profile", (req, res) => {
  try {
    const dbData = readDb();
    dbData.profile = {
      ...dbData.profile,
      ...req.body
    };
    writeDb(dbData);
    res.json(dbData.profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- FOLLOWING SYSTEM ---
app.get("/api/following", (req, res) => {
  try {
    const dbData = readDb();
    res.json(dbData.following);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/following/toggle", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    const dbData = readDb();
    const index = dbData.following.indexOf(username);
    let isFollowingNow = false;
    if (index > -1) {
      dbData.following.splice(index, 1);
    } else {
      dbData.following.push(username);
      isFollowingNow = true;
    }
    writeDb(dbData);
    res.json({ following: dbData.following, isFollowing: isFollowingNow });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- CHAT SYSTEM ---
app.get("/api/chats/:username", (req, res) => {
  const { username } = req.params;
  try {
    const dbData = readDb();
    const myName = dbData.profile.name || "Edo Erpani";
    const conversation = dbData.chats.filter(
      (chat) =>
        (chat.fromUser === myName && chat.toUser === username) ||
        (chat.fromUser === username && chat.toUser === myName)
    );
    res.json(conversation);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/chats/:username", (req, res) => {
  const { username } = req.params;
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }
  try {
    const dbData = readDb();
    const myName = dbData.profile.name || "Edo Erpani";
    const newChat = {
      id: dbData.meta.nextChatId++,
      fromUser: myName,
      toUser: username,
      content: content.trim(),
      timestamp: "Baru saja"
    };
    dbData.chats.push(newChat);
    writeDb(dbData);

    const autoReplies: Record<string, string[]> = {
      "Sarah J.": [
        "Wah menarik sekali! Jangan lupa mampir ke Jembatan Aji Tulur Jejangkat, pemandangan Mahakam di sore hari sangat indah lho.",
        "Kutai Barat punya banyak cagar alam juga! Apakah kamu pernah dengar tentang Cagar Alam Kersik Luway? Di sana adalah habitat Anggrek Hitam.",
        "Halo! Suku Dayak di sini sangat ramah. Kalau mampir ke Lamin Adat, kita bisa melihat tarian tradisional Dayak yang luar biasa."
      ],
      "Alex Rivera": [
        "Halo bro! Keren banget petualangannya. Rekomendasi saya coba susuri Sungai Mahakam pakai kapal kayu ces, asyik parah!",
        "Kutai Barat itu surganya petualang. Sudah coba kuliner ikan patin bakar khas Melak belum?",
        "Kalau ke Danau Jempang, pastikan mampir ke perkampungan terapung Tanjung Isuy ya. Sangat bersejarah!"
      ],
      "Maria K.": [
        "Hai! Senang mengobrol denganmu. Alam Kutai Barat sangat menenangkan, terutama hutan adatnya yang masih rimbun.",
        "Apakah kamu tertarik dengan kerajinan tenun khas Dayak? Namanya tenun Ulap Doyo, dibuat dari serat daun doyo!",
        "Jangan lupa menjaga kelestarian alam ya saat berkunjung. Selamat menikmati keindahan Kutai Barat!"
      ]
    };

    const replies = autoReplies[username] || [
      "Terima kasih pesannya! Saya sedang berada di pedalaman Kutai Barat sekarang. Mari lestarikan budaya dan alam kita!",
      "Senang mengobrol dengan sesama pencinta pesona Kutai Barat. Semoga harimu menyenangkan!"
    ];

    const replyContent = replies[Math.floor(Math.random() * replies.length)];
    const newReply = {
      id: dbData.meta.nextChatId++,
      fromUser: username,
      toUser: myName,
      content: replyContent,
      timestamp: "Baru saja"
    };

    dbData.chats.push(newReply);
    writeDb(dbData);

    res.status(201).json({ sent: newChat, received: newReply });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- REFLECTIONS CSV SYNC SYSTEM ---
app.get("/api/reflections", (req, res) => {
  try {
    const dbData = readDb();
    res.json(dbData.reflections || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/reflections/sync", (req, res) => {
  const { items, merge } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Items array is required for synchronization" });
  }

  try {
    const dbData = readDb();
    if (!dbData.reflections) dbData.reflections = [];

    if (merge) {
      // Merge: Update existing IDs, insert new ones
      const existingMap = new Map(dbData.reflections.map(r => [r.id, r]));
      items.forEach((item: any) => {
        if (item.id) {
          existingMap.set(item.id, {
            id: String(item.id),
            title: String(item.title || ""),
            content: String(item.content || ""),
            category: String(item.category || "affirmation"),
            mood: String(item.mood || "Calm"),
            createdAt: String(item.createdAt || new Date().toISOString())
          });
        }
      });
      dbData.reflections = Array.from(existingMap.values());
    } else {
      // Replace completely
      dbData.reflections = items.map((item: any, idx: number) => ({
        id: String(item.id || `sync-${idx + 1}`),
        title: String(item.title || ""),
        content: String(item.content || ""),
        category: String(item.category || "affirmation"),
        mood: String(item.mood || "Calm"),
        createdAt: String(item.createdAt || new Date().toISOString())
      }));
    }

    writeDb(dbData);
    res.json({ success: true, count: dbData.reflections.length, reflections: dbData.reflections });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/reflections", (req, res) => {
  const { title, content, category, mood } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const dbData = readDb();
    if (!dbData.reflections) dbData.reflections = [];

    const newReflection = {
      id: `custom-${Date.now()}`,
      title,
      content,
      category: category || "affirmation",
      mood: mood || "Calm",
      createdAt: new Date().toISOString()
    };

    dbData.reflections.push(newReflection);
    writeDb(dbData);
    res.status(201).json(newReflection);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/reflections/:id", (req, res) => {
  const { id } = req.params;
  try {
    const dbData = readDb();
    if (!dbData.reflections) dbData.reflections = [];

    const initialLength = dbData.reflections.length;
    dbData.reflections = dbData.reflections.filter(r => r.id !== id);

    if (dbData.reflections.length === initialLength) {
      return res.status(404).json({ error: "Reflection not found" });
    }

    writeDb(dbData);
    res.json({ success: true, deletedId: id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- VITE MIDDLEWARE SETUP ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Eunoiaverse server running at http://localhost:${PORT}`);
  });
}

startServer();
