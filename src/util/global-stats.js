
export const convertData = sites => {
  let output = {
    passes: 0,
    failures: 0,
    sites: 0,
    tests: 0
  };

  Object.keys(sites).forEach(site => {
    output.sites++;
    output.passes += sites[site].passes;
    output.failures += sites[site].failures;
    output.tests += sites[site].tests;
  });

  return output;
}

export const getPassPercent = (passes, failures) => {
  const total = passes + failures;
  return total > 0 ? Math.round((passes / total) * 100) : 0;
}

//public
export default function (data) {
  const { passes, failures, sites, tests} = convertData(data);
  const passPercent = getPassPercent(passes, failures);

  return {
    passPercent,
    tests,
    sites
  }
}
