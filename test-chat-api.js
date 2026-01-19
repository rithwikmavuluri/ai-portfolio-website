// Quick test script to check if the chat API is working
async function testChatAPI() {
  console.log('🧪 Testing Chat API...\n');

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What AI products have you shipped?',
        conversationHistory: []
      })
    });

    console.log('📊 Response Status:', response.status);
    console.log('📊 Response OK:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error Response:', errorData);
      return;
    }

    // Try to read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    console.log('\n📨 Streaming Response:\n');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullResponse += chunk;
      process.stdout.write(chunk);
    }

    console.log('\n\n✅ Test completed successfully!');
    console.log(`📝 Total response length: ${fullResponse.length} characters`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testChatAPI();
