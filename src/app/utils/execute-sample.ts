export function ExecuteSample(instance: any, seq = 0) {
  if (!seq) ExecuteLatestSample(instance);
  else executeFunction(instance, seq);
}

export function ExecuteLatestSample(instance: any) {
  const functionNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  );
  const sampleFunctions = functionNames.filter((name) =>
    /^sample\d+$/.test(name)
  );

  if (sampleFunctions.length === 0) {
    console.log('No sample functions found.');
    return;
  }

  const maxNumber = sampleFunctions.reduce((max, name) => {
    const match = name.match(/^sample(\d+)$/);
    if (match) {
      const number = parseInt(match[1]);
      return isNaN(number) ? max : Math.max(max, number);
    }
    return max;
  }, -Infinity);

  executeFunction(instance, maxNumber);
}

function executeFunction(instance: any, funcAlias: string | number) {
  const functionName = `sample${funcAlias}`;
  const targetFunction = instance[functionName];

  if (typeof targetFunction === 'function') {
    console.log(`Executing ${functionName}...`);
    targetFunction.call(instance);
  } else {
    console.log(`Function ${functionName} not found or not a function.`);
  }
}
