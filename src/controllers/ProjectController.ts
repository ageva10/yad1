import { IRouter, Router, Request, Response } from 'express'
import { BaseController } from './'
import { asyncWrap } from '../middlewares'
import MADLAN_QUERY from '../queries/madlan'
import axios from 'axios'

class ProjectController extends BaseController {
  router: IRouter
  yad2BaseUrl: string = 'https://www.yad2.co.il'
  madlanBaseUrl: string = 'https://www.madlan.co.il/api2'

  constructor() {
    super()
    this.router = Router()
    this.router.get('/yad2', asyncWrap(this.getYad2.bind(this)))
    this.router.get('/madlan', asyncWrap(this.getMadlan.bind(this)))
  }

  getRouter(): IRouter {
    return this.router
  }

  async getYad2(req: Request, res: Response) {
    try {
      const { page = 1 } = req.query

      const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'baggage': 'sentry-environment=prod,sentry-release=yad1-35a649c265bf3904b687eaa74bd905d3cb6e51e3,sentry-public_key=fd7d23a8d868485399868caf5fd39b0d,sentry-trace_id=6ccb3bbe69fc41b8a4f0caed2da802df,sentry-sample_rate=1,sentry-sampled=true',
        'priority': 'u=1, i',
        'referer': 'https://www.yad2.co.il/yad1/newprojects?category=1&bBox=31.907561%2C34.758622%2C32.222753%2C35.015376&zoom=11',
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sentry-trace': '6ccb3bbe69fc41b8a4f0caed2da802df-97e38054077fc418-1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'uzlc': 'true',
        'x-nextjs-data': '1',
        'Cookie': 'adminer_key=ac78ee0a7c8a93502e5657b801261418; adminer_permanent=; adminer_sid=34r6c61sb3i6p73b78g19d6g00; io=Jm9pgQ9sTVrdRaIlAAAC'
      };

      // Petah Tikva
      const { data: result1 } = await axios.get(`${this.yad2BaseUrl}/yad1/_next/data/6C86XLWkvRiUVvjHrQ0bk/newprojects.json`, {
        params: {
          topArea: 2,
          area: 4,
          city: 7900,
          page
        },
        headers,
      })

      // Kiryat Ono
      const { data: result2 } = await axios.get(`${this.yad2BaseUrl}/yad1/_next/data/6C86XLWkvRiUVvjHrQ0bk/newprojects.json`, {
        params: {
          topArea: 2,
          area: 10,
          city: 2620,
          page
        },
        headers,
      })

      const projects = [
        ...result1.pageProps.boostProjectsRes.projects,
        ...result2.pageProps.boostProjectsRes.projects,
        ...result1.pageProps.projectsRes.projects,
        ...result2.pageProps.projectsRes.projects,
      ]

      return res.status(200).json(projects)

    } catch (err: unknown) {
      return res.status(400).end()
    }
  }

  async getMadlan(req: Request, res: Response) {
    try {

      const { offset, limit = 100 } = req.query

      const body = {
        operationName: 'searchPoi',
        query: MADLAN_QUERY,
        variables: {
          "noFee": false,
          "dealType": "unitBuy",
          "numberOfEmployeesRange": [
            null,
            null
          ],
          "commercialAmenities": {},
          "qualityClass": [],
          "discountedProjects": false,
          "roomsRange": [
            4,
            null
          ],
          "bathsRange": [
            null,
            null
          ],
          "floorRange": [
            null,
            null
          ],
          "areaRange": [
            null,
            null
          ],
          "buildingClass": [],
          "sellerType": [
            "developer"
          ],
          "generalCondition": [],
          "ppmRange": [
            null,
            null
          ],
          "priceRange": [
            null,
            null
          ],
          "monthlyTaxRange": [
            null,
            null
          ],
          "amenities": {},
          "sort": [
            {
              "field": "geometry",
              "order": "asc",
              "reference": null,
              "docIds": [
                "פתח-תקווה-ישראל"
              ]
            }
          ],
          "tileRanges": [
            {
              "x1": 156453,
              "y1": 106355,
              "x2": 156493,
              "y2": 106398
            }
          ],
          "priceDrop": false,
          "underPriceEstimation": false,
          "isCommercialRealEstate": false,
          "userContext": null,
          "poiTypes": [
            "bulletin",
            "project"
          ],
          "searchContext": "marketplace",
          "cursor": {
            "seenProjects": null,
            "bulletinsOffset": 0
          },
          "offset": Number(offset),
          "limit": Number(limit),
          "abtests": {
            "_be_sortMarketplaceByDate": "modeA",
            "_be_sortMarketplaceAgeWeight": "modeA",
            "_be_sortMarketplaceByHasAtLeastOneImage": "modeA"
          }
        }
      }

      const { data } = await axios.post(`${this.madlanBaseUrl}`, body, {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
        }
      })

      let projects = data.data.searchPoiV2.poi.filter((poi: any): boolean => poi.type === 'project')

      projects = projects.filter((project: any): boolean =>
        /פתח תקו(ה|וה)/.test(project.addressDetails.city)
      )

      return res.status(200).json(projects)

    } catch (err: unknown) {
      return res.status(400).end()
    }
  }
}

export default ProjectController
