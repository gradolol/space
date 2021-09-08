import axios from './axiosConfig'

export const fetchRecentLaunches = async (params) =>
  await axios({
    url: '/launches/past',
    method: 'get',
    params,
  })

export const fetchUpcomingLaunches = async (params) =>
  await axios({
    url: '/launches/upcoming',
    method: 'get',
    params,
  })

export const fetchSingleLaunch = async (id) =>
  await axios({
    url: `/launches/${id}`,
    method: 'get',
  })

export const bookLaunch = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`success: ${id}`)
    }, 1000)
  })

export const cancelBooking = (id) =>
  //@eslint-ignore
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`error: ${id}`)
    }, 1000)
  })
