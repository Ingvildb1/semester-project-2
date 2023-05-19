export function removeEnded(data) {
    const current = Date.parse(new Date());
  
    const filtered = data.filter((item) => {
      const ends = item.endsAt;
      const itemEnd = Date.parse(ends);
      return itemEnd > current && item.media.length > 0;
    });
  
    return filtered;
  }