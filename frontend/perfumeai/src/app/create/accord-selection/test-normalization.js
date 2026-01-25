// Test normalization logic for accord selection
// This file can be run in the browser console to verify the normalization works correctly

function testNormalization() {
  console.log('=== Accord Normalization Tests ===\n');

  const testCases = [
    {
      name: 'Equal values (25, 25, 25, 25)',
      woody: 25,
      floral: 25,
      fresh: 25,
      oriental: 25,
      expected: { woody: 0.25, floral: 0.25, fresh: 0.25, oriental: 0.25 }
    },
    {
      name: 'All zeros (0, 0, 0, 0)',
      woody: 0,
      floral: 0,
      fresh: 0,
      oriental: 0,
      expected: { woody: 0, floral: 0, fresh: 0, oriental: 0 }
    },
    {
      name: 'Single value (100, 0, 0, 0)',
      woody: 100,
      floral: 0,
      fresh: 0,
      oriental: 0,
      expected: { woody: 1.0, floral: 0, fresh: 0, oriental: 0 }
    },
    {
      name: 'Two values (50, 50, 0, 0)',
      woody: 50,
      floral: 50,
      fresh: 0,
      oriental: 0,
      expected: { woody: 0.5, floral: 0.5, fresh: 0, oriental: 0 }
    },
    {
      name: 'Unequal distribution (40, 30, 20, 10)',
      woody: 40,
      floral: 30,
      fresh: 20,
      oriental: 10,
      expected: { woody: 0.4, floral: 0.3, fresh: 0.2, oriental: 0.1 }
    },
    {
      name: 'High values (80, 60, 40, 20)',
      woody: 80,
      floral: 60,
      fresh: 40,
      oriental: 20,
      expected: { woody: 0.4, floral: 0.3, fresh: 0.2, oriental: 0.1 }
    },
    {
      name: 'Three values (33, 33, 34, 0)',
      woody: 33,
      floral: 33,
      fresh: 34,
      oriental: 0,
      expected: { woody: 0.33, floral: 0.33, fresh: 0.34, oriental: 0 }
    }
  ];

  let passCount = 0;
  let failCount = 0;

  testCases.forEach((testCase) => {
    const { woody, floral, fresh, oriental, expected } = testCase;
    const total = woody + floral + fresh + oriental;

    const normalized = total === 0 ? {
      woody: 0,
      floral: 0,
      fresh: 0,
      oriental: 0
    } : {
      woody: woody / total,
      floral: floral / total,
      fresh: fresh / total,
      oriental: oriental / total
    };

    // Round to 2 decimal places for comparison
    const roundedNormalized = {
      woody: parseFloat(normalized.woody.toFixed(2)),
      floral: parseFloat(normalized.floral.toFixed(2)),
      fresh: parseFloat(normalized.fresh.toFixed(2)),
      oriental: parseFloat(normalized.oriental.toFixed(2))
    };

    // Check if sum equals 1.0 (or 0 if all zeros)
    const sum = roundedNormalized.woody + roundedNormalized.floral + 
                roundedNormalized.fresh + roundedNormalized.oriental;
    const sumValid = total === 0 ? sum === 0 : Math.abs(sum - 1.0) < 0.01;

    // Check if values match expected
    const valuesMatch = 
      Math.abs(roundedNormalized.woody - expected.woody) < 0.01 &&
      Math.abs(roundedNormalized.floral - expected.floral) < 0.01 &&
      Math.abs(roundedNormalized.fresh - expected.fresh) < 0.01 &&
      Math.abs(roundedNormalized.oriental - expected.oriental) < 0.01;

    const passed = sumValid && valuesMatch;

    if (passed) {
      passCount++;
      console.log(`✅ PASS: ${testCase.name}`);
    } else {
      failCount++;
      console.log(`❌ FAIL: ${testCase.name}`);
      console.log('  Expected:', expected);
      console.log('  Got:', roundedNormalized);
      console.log('  Sum:', sum);
    }

    console.log('  Input:', { woody, floral, fresh, oriental });
    console.log('  Output:', roundedNormalized);
    console.log('  Percentages:', {
      woody: `${(roundedNormalized.woody * 100).toFixed(1)}%`,
      floral: `${(roundedNormalized.floral * 100).toFixed(1)}%`,
      fresh: `${(roundedNormalized.fresh * 100).toFixed(1)}%`,
      oriental: `${(roundedNormalized.oriental * 100).toFixed(1)}%`
    });
    console.log('');
  });

  console.log('=== Test Summary ===');
  console.log(`Total Tests: ${testCases.length}`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log('===================\n');

  // Test output format
  console.log('=== Output Format Test ===');
  const sampleNormalized = { woody: 0.25, floral: 0.35, fresh: 0.20, oriental: 0.20 };
  const outputArray = [
    { floral: parseFloat(sampleNormalized.floral.toFixed(2)) },
    { oriental: parseFloat(sampleNormalized.oriental.toFixed(2)) },
    { woody: parseFloat(sampleNormalized.woody.toFixed(2)) },
    { fresh: parseFloat(sampleNormalized.fresh.toFixed(2)) }
  ];
  console.log('Expected format:', JSON.stringify(outputArray, null, 2));
  console.log('==========================\n');

  return { passCount, failCount, total: testCases.length };
}

// Run tests
if (typeof window !== 'undefined') {
  console.log('To run normalization tests, call: testNormalization()');
}

// Export for use in browser console
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testNormalization };
}
