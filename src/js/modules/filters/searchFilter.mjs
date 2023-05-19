export function searchFilter(term, data) {
    const copy = data.slice(0, data.length);
  
    const filtered = copy.filter((e) => {
      return (
        e.id.toLowerCase().includes(term.toLowerCase()) ||
        e.created.toLowerCase().includes(term.toLowerCase()) ||
        e.description?.toLowerCase().includes(term.toLowerCase()) ||
        e.id.toLowerCase().includes(term.toLowerCase()) ||
        e.seller.name.toLowerCase().includes(term.toLowerCase()) ||
        e.seller.email.toLowerCase().includes(term.toLowerCase()) ||
        e.title.toLowerCase().includes(term.toLowerCase())
      );
    });
    return filtered;
  }