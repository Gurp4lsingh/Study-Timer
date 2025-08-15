export default async function handler(req, res) {
  try {
    let data;
    let attempts = 0;

    do {
      const response = await fetch(
        'https://api.quotable.io/random?tags=motivational|inspirational'
      );
      if (!response.ok) throw new Error('Failed to fetch quote');
      data = await response.json();
      attempts++;
    } while (
      (
        !data.author ||
        data.author.toLowerCase() === 'anonymous' ||
        data.author.toLowerCase() === 'unknown' ||
        data.content.length > 120
      ) &&
      attempts < 5
    );

    res.status(200).json({
      text: data.content,
      author: data.author
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}
