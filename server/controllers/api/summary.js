import Summary from '../../models/summary';

// private
const convertData = data => {
  let output = {};
  data.forEach(item => {
    output = { ...output, [item[0].site]: item[0] };
  });

  return output;
}

const getSites = () => {
  return new Promise((resolve, reject) => {
    Summary.distinct("site").exec((err, sites) => {
      if(err) reject(err);
      resolve(sites);
    });
  })
}

const getAllRecentData = sites => {
  return new Promise((resolve, reject) => {
    Promise.all(sites.map(getRecentData))
      .then(output => {
        resolve(convertData(output));
      })
      .catch(reject);
  });
}

const getRecentData = site => {
  return new Promise((resolve, reject) => {
    Summary.find({site}).sort({createdAt: -1}).limit(1).exec((err, data) => {
      if (err) reject(err);
      resolve(data)
    });
  });
}

const getFullData = site => {
  return new Promise((resolve, reject) => {
    Summary.find({site}).sort({createAt: -1}).exec((err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
}

// public
export const getRecentAll = () => {
  return new Promise((resolve, reject) => {
    getSites()
      .then(getAllRecentData)
      .then(resolve)
      .catch(reject);
  })
}

export const getFull = site => {
  return new Promise((resolve, reject) => {
    getFullData(site)
      .then(resolve)
      .catch(reject);
  })
}
