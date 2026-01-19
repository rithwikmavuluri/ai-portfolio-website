async function testChat() {
  console.log('🧪 Testing Chat API with new key...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What AI products have you shipped?',
        conversationHistory: []
      })
    });

    console.log('Status:', response.status, response.ok ? '✅' : '❌');

    if (!response.ok) {
      const error = await response.json();
      console.error('Error:', error);
      process.exit(1);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = '';

    console.log('\n💬 Response:\n');
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      text += chunk;
      process.stdout.write(chunk);
    }

    console.log('\n\n✅ SUCCESS! Chat is working!');
    console.log(`📊 Response length: ${text.length} characters`);
    process.exit(0);

  } catch (error) {
    console.error('\n❌ FAILED:', error.message);
    process.exit(1);
  }
}

testChat();
