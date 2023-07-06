// This is the tag with the hash key
const hashElement = document.getElementById('osk-chat-bot');

function createChatBotScriptTag (scriptUrl: string) {
  // Create new script tag
  const script = document.createElement('script');
  script.src = scriptUrl;

  // Append the script tag to the body (or any other container)
  document.body.appendChild(script);
}

if (hashElement) {
  const hashKey = hashElement.getAttribute('data-hash'); // Assuming hash is stored in 'data-hash' attribute

  if (hashKey) {
    // // Send request to the backend
    // fetch(`http://backend-url.com/endpoint?hash=${hashKey}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Assuming backend responds with a JSON object that has a 'url' property
    //     createChatBotScriptTag(data.url)
    //   })
    //   .catch(error => {
    //     console.error(`Fetch Error: ${error}`);
    //   });

    createChatBotScriptTag(`../dist/osk-chat-bot.umd.min.js?hash=${hashKey}`)
  }
}
