exports.handler = async function(event, context) {
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);

      // Filter out numbers and alphabets
      const numbers = data.data.filter(item => !isNaN(item));
      const alphabets = data.data.filter(item => /^[a-zA-Z]$/.test(item));

      // Sort alphabets case-insensitively and find the highest alphabet
      const sortedAlphabets = alphabets.sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
      const highestAlphabet = sortedAlphabets.length ? sortedAlphabets[sortedAlphabets.length - 1] : '';

      return {
        statusCode: 200,
        body: JSON.stringify({
          is_success: true,
          user_id: "shaurya_srinet_01012000",
          email: "arpitaguha.neogi2021@vitstudent.ac.in",
          roll_number: "21BLC1584",
          numbers: numbers,
          alphabets: sortedAlphabets,  // Ensure all alphabets are included
          highest_alphabet: [highestAlphabet]
        })
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({ is_success: false, error: error.message })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed" })
  };
};
