const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(`${url}/${cmd}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.json();
}

module.exports = async (req, res) => {
  try {
    let result;
    if (req.method === "POST") {
      result = (await redis("incr/mila_votes")).result;
    } else {
      result = (await redis("get/mila_votes")).result ?? 0;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ votes: Number(result) });
  } catch (e) {
    res.status(500).json({ error: "fail" });
  }
};
