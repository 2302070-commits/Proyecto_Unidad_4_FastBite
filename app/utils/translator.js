export const translateBulkTexts = async (texts) => {
  if (!texts || texts.length === 0) return [];
  try {
    // Usamos delimitador ␞ (separador de registro) que no se confunde con palabras para traducciones exactas
    const combined = texts.join('\n');
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(combined)}`);
    const data = await response.json();
    
    if (data && data[0]) {
      let finalStr = '';
      data[0].forEach(item => { if(item[0]) finalStr += item[0]; });
      const results = finalStr.split('\n').map(s => s.trim());
      // Handle cases where the translator might lose lines
      if (results.length === texts.length) {
          return results;
      }
    }
  } catch (e) {
    console.error('Translation helper error', e);
  }
  return texts; // fallback to original
};
