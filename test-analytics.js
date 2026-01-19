/**
 * Analytics Test Script
 * Verifies Firebase and GA4 configuration
 */

// Check environment variables
console.log('\n🔍 Checking Environment Variables...\n');

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
];

let allVarsPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allVarsPresent = false;
  }
});

if (allVarsPresent) {
  console.log('\n✅ All environment variables are set correctly!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start dev server: npm run dev');
  console.log('2. Open browser console');
  console.log('3. Look for initialization messages');
  console.log('4. Test chat and CTA clicks');
  console.log('5. Verify in GA4 Realtime and Firestore Console');
} else {
  console.log('\n❌ Some environment variables are missing!');
  console.log('Please check your .env.local file');
}

console.log('\n');
