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

      // Petah Tikva
      const { data: result1 } = await axios.get(`https://gw.yad2.co.il/yad1/projects?topArea=2&area=4&city=7900&limit=200&page=${page}`)

      // Kiryat Ono
      const { data: result2 } = await axios.get(`https://gw.yad2.co.il/yad1/projects?topArea=2&area=10&city=2620&limit=200&page=${page}`)

      const projects = [
        ...result1.data.projects,
        ...result2.data.projects,
      ]

      return res.status(200).json(projects)

    } catch (err: unknown) {
      console.error(err)
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
                "פתח-תקווה-ישראל",
                "קרית-אונו-ישראל"
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
        /(פתח תקו(ה|וה)|קרית אונו)/.test(project.addressDetails.city)
      )

      return res.status(200).json(projects)

    } catch (err: unknown) {
      console.error(err)
      return res.status(400).end()
    }
  }
}

export default ProjectController
