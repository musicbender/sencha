export default {
  global: {
    pageLoaded: false,
    drawerOpen: false
  },
  settings: {
    live: false,
    archive: false
  },
  summary: {
    all: {},
    site: {},
    error: null,
    loading: false
  },
  sites: {
    data: [],
    error: null,
    loading: false
  },
  report: {
    data: null,
    config: null,
    error: null,
    loading: false
  },
  runner: {
    site: "",
    loading: false,
    error: null,
  },
  progress: {
    inProgress: false,
    error: null
  }
}
