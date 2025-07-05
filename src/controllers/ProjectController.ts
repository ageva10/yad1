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
      const { data: result1 } = await axios.get(`https://gw.yad2.co.il/yad1/projects?topArea=2&area=4&city=7900&limit=200&page=${page}`, {
        headers: {
          Cookie: '__uzma=2a17c738-a5a7-4bf5-bfe8-363aa176a568; __uzmb=1751704306; __uzme=5928; canary=never; __ssds=0; y2018-2-cohort=29; guest_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InV1aWQiOiI5NDJkMWFiOS1jN2Q5LTQ0NjUtOTMzYy0xNGU3MjFkODNkNjEifSwiaWF0IjoxNzUxNzEwMTAxLCJleHAiOjE3ODMyNjc3MDF9.2rv_XPKAKmHUqSGMaYZIiau3hG6uVpsMrXQxgjR8jVU; glassix-visitor-id-v2-eee15832-4aee-4db2-873b-7cdb8a61035e=08d34083-f5ea-4a35-b793-81f6e52b3fbe; _gcl_au=1.1.868362485.1751710102; _fbp=fb.2.1751710102261.232014685124084477; abTestKey=90; _vwo_uuid_v2=D61F42D82BA9FC8529E0EC91925406D5F|968e412ef4f465be1e6a900e074e9767; _gid=GA1.3.675134036.1751710774; server_env=production; _ga=GA1.1.364113500.1751710102; leadSaleRentFree=2; y2_cohort_2020=21; use_elastic_search=1; cohortGroup=C; _ga_VLJNNRRTS8=GS2.1.s1751710879$o1$g0$t1751710887$j52$l0$h0; _clck=14sejux%7C2%7Cfxc%7C0%7C2012; _clsk=n7pxeu%7C1751711044995%7C1%7C1%7Cb.clarity.ms%2Fcollect; __gads=ID=6a674bf5472687bf:T=1751710102:RT=1751711390:S=ALNI_MbugWBMKH0n9EK8zfAgZy4Dqp-Xig; __gpi=UID=0000117240a5e320:T=1751710102:RT=1751711390:S=ALNI_MZV6I7U3MKFtXC3WJYA4wpZUCsfRA; __eoi=ID=a1cb38fbabef379f:T=1751710102:RT=1751711390:S=AA-AfjZ47zVdLUXPCkM1nTbQp0sx; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFnZXZhMTBAZ21haWwuY29tIiwiTWFpbGluZ0VtYWlsIjoiYWdldmExMEBnbWFpbC5jb20iLCJFbWFpbCI6ImFnZXZhMTBAZ21haWwuY29tIiwiVXNlcklEIjozMjk0MzQ1LCJGaXJzdE5hbWUiOiLXkNec15XXnyIsIkxhc3ROYW1lIjoi15LXkdeiIiwiaXNDYXJUcmFkZXIiOjAsImlzQ2FyQWNjZXNzb3J5VHJhZGVyIjowLCJpc1RvdXJpc21UcmFkZXIiOjAsImlzUmVhbEVzdGF0ZU1hcmtldGluZyI6MCwiWWFkMlRyYWRlIjowLCJFbWFpbFZlcmlmaWVkIjoiMjAyMi0wOC0yOFQyMjoxOTo0NS4wMDBaIiwiaXNUd29XaGVlbGVkVHJhZGVyIjowLCJUaXYiOjAsIk1haWxpbmdMaXN0IjoxLCJVVUlEIjoiMWY3N2FiNTQtOWVhZS0xMWVjLWFhNzUtMDI5YzY2ZWI4N2I1IiwiaWF0IjoxNzUxNzExNDAzLCJleHAiOjE3NTE3MTIzMDN9.sGTERywcN_N_aMlUy3o1doKiecRfIqgDC2Qoxc_MASU; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFnZXZhMTBAZ21haWwuY29tIiwiTWFpbGluZ0VtYWlsIjoiYWdldmExMEBnbWFpbC5jb20iLCJFbWFpbCI6ImFnZXZhMTBAZ21haWwuY29tIiwiVXNlcklEIjozMjk0MzQ1LCJGaXJzdE5hbWUiOiLXkNec15XXnyIsIkxhc3ROYW1lIjoi15LXkdeiIiwiaXNDYXJUcmFkZXIiOjAsImlzQ2FyQWNjZXNzb3J5VHJhZGVyIjowLCJpc1RvdXJpc21UcmFkZXIiOjAsImlzUmVhbEVzdGF0ZU1hcmtldGluZyI6MCwiWWFkMlRyYWRlIjowLCJFbWFpbFZlcmlmaWVkIjoiMjAyMi0wOC0yOFQyMjoxOTo0NS4wMDBaIiwiaXNUd29XaGVlbGVkVHJhZGVyIjowLCJUaXYiOjAsIk1haWxpbmdMaXN0IjoxLCJVVUlEIjoiMWY3N2FiNTQtOWVhZS0xMWVjLWFhNzUtMDI5YzY2ZWI4N2I1IiwiaWF0IjoxNzUxNzExNDAzLCJleHAiOjE3NTk0ODc0MDN9.Mz6l5oZy4ow282xk1ASc6rBKuJVPycZyaEqdOfLv-Zs; favorites_userid=fvuundefined; ab.storage.deviceId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3Aef4e19a1-b6c8-ae8e-e01b-b7731b809c9a%7Ce%3Aundefined%7Cc%3A1751710101023%7Cl%3A1751711407394; ab.storage.userId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3A1f77ab54-9eae-11ec-aa75-029c66eb87b5%7Ce%3Aundefined%7Cc%3A1751711407393%7Cl%3A1751711407395; __uzmd=1751711408; __uzmc=5184216342480; __uzmf=7f90002a17c738-a5a7-4bf5-bfe8-363aa176a5681-17517043069487101474-0001a6cd64350c66bb3163; ab.storage.sessionId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3Ab53dac57-7182-5aa4-0153-b78b858468e5%7Ce%3A1751713207844%7Cc%3A1751711407394%7Cl%3A1751711407844; _ga_GQ385NHRG1=GS2.1.s1751710101$o1$g1$t1751711417$j33$l0$h0; recommendations-home-category={"categoryId":1,"subCategoryId":21}; uzmx=7f900007cc16f0-e9b9-4f4e-a286-e6724b36573a1-17517043069487113031-e52f233ba27f77e3256'
        }
      })

      // Kiryat Ono
      const { data: result2 } = await axios.get(`https://gw.yad2.co.il/yad1/projects?topArea=2&area=10&city=2620&limit=200&page=${page}`, {
        headers: {
          Cookie: '__uzma=2a17c738-a5a7-4bf5-bfe8-363aa176a568; __uzmb=1751704306; __uzme=5928; canary=never; __ssds=0; y2018-2-cohort=29; guest_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InV1aWQiOiI5NDJkMWFiOS1jN2Q5LTQ0NjUtOTMzYy0xNGU3MjFkODNkNjEifSwiaWF0IjoxNzUxNzEwMTAxLCJleHAiOjE3ODMyNjc3MDF9.2rv_XPKAKmHUqSGMaYZIiau3hG6uVpsMrXQxgjR8jVU; glassix-visitor-id-v2-eee15832-4aee-4db2-873b-7cdb8a61035e=08d34083-f5ea-4a35-b793-81f6e52b3fbe; _gcl_au=1.1.868362485.1751710102; _fbp=fb.2.1751710102261.232014685124084477; abTestKey=90; _vwo_uuid_v2=D61F42D82BA9FC8529E0EC91925406D5F|968e412ef4f465be1e6a900e074e9767; _gid=GA1.3.675134036.1751710774; server_env=production; _ga=GA1.1.364113500.1751710102; leadSaleRentFree=2; y2_cohort_2020=21; use_elastic_search=1; cohortGroup=C; _ga_VLJNNRRTS8=GS2.1.s1751710879$o1$g0$t1751710887$j52$l0$h0; _clck=14sejux%7C2%7Cfxc%7C0%7C2012; _clsk=n7pxeu%7C1751711044995%7C1%7C1%7Cb.clarity.ms%2Fcollect; __gads=ID=6a674bf5472687bf:T=1751710102:RT=1751711390:S=ALNI_MbugWBMKH0n9EK8zfAgZy4Dqp-Xig; __gpi=UID=0000117240a5e320:T=1751710102:RT=1751711390:S=ALNI_MZV6I7U3MKFtXC3WJYA4wpZUCsfRA; __eoi=ID=a1cb38fbabef379f:T=1751710102:RT=1751711390:S=AA-AfjZ47zVdLUXPCkM1nTbQp0sx; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFnZXZhMTBAZ21haWwuY29tIiwiTWFpbGluZ0VtYWlsIjoiYWdldmExMEBnbWFpbC5jb20iLCJFbWFpbCI6ImFnZXZhMTBAZ21haWwuY29tIiwiVXNlcklEIjozMjk0MzQ1LCJGaXJzdE5hbWUiOiLXkNec15XXnyIsIkxhc3ROYW1lIjoi15LXkdeiIiwiaXNDYXJUcmFkZXIiOjAsImlzQ2FyQWNjZXNzb3J5VHJhZGVyIjowLCJpc1RvdXJpc21UcmFkZXIiOjAsImlzUmVhbEVzdGF0ZU1hcmtldGluZyI6MCwiWWFkMlRyYWRlIjowLCJFbWFpbFZlcmlmaWVkIjoiMjAyMi0wOC0yOFQyMjoxOTo0NS4wMDBaIiwiaXNUd29XaGVlbGVkVHJhZGVyIjowLCJUaXYiOjAsIk1haWxpbmdMaXN0IjoxLCJVVUlEIjoiMWY3N2FiNTQtOWVhZS0xMWVjLWFhNzUtMDI5YzY2ZWI4N2I1IiwiaWF0IjoxNzUxNzExNDAzLCJleHAiOjE3NTE3MTIzMDN9.sGTERywcN_N_aMlUy3o1doKiecRfIqgDC2Qoxc_MASU; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFnZXZhMTBAZ21haWwuY29tIiwiTWFpbGluZ0VtYWlsIjoiYWdldmExMEBnbWFpbC5jb20iLCJFbWFpbCI6ImFnZXZhMTBAZ21haWwuY29tIiwiVXNlcklEIjozMjk0MzQ1LCJGaXJzdE5hbWUiOiLXkNec15XXnyIsIkxhc3ROYW1lIjoi15LXkdeiIiwiaXNDYXJUcmFkZXIiOjAsImlzQ2FyQWNjZXNzb3J5VHJhZGVyIjowLCJpc1RvdXJpc21UcmFkZXIiOjAsImlzUmVhbEVzdGF0ZU1hcmtldGluZyI6MCwiWWFkMlRyYWRlIjowLCJFbWFpbFZlcmlmaWVkIjoiMjAyMi0wOC0yOFQyMjoxOTo0NS4wMDBaIiwiaXNUd29XaGVlbGVkVHJhZGVyIjowLCJUaXYiOjAsIk1haWxpbmdMaXN0IjoxLCJVVUlEIjoiMWY3N2FiNTQtOWVhZS0xMWVjLWFhNzUtMDI5YzY2ZWI4N2I1IiwiaWF0IjoxNzUxNzExNDAzLCJleHAiOjE3NTk0ODc0MDN9.Mz6l5oZy4ow282xk1ASc6rBKuJVPycZyaEqdOfLv-Zs; favorites_userid=fvuundefined; ab.storage.deviceId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3Aef4e19a1-b6c8-ae8e-e01b-b7731b809c9a%7Ce%3Aundefined%7Cc%3A1751710101023%7Cl%3A1751711407394; ab.storage.userId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3A1f77ab54-9eae-11ec-aa75-029c66eb87b5%7Ce%3Aundefined%7Cc%3A1751711407393%7Cl%3A1751711407395; __uzmd=1751711408; __uzmc=5184216342480; __uzmf=7f90002a17c738-a5a7-4bf5-bfe8-363aa176a5681-17517043069487101474-0001a6cd64350c66bb3163; ab.storage.sessionId.716d3f2d-2039-4ea6-bd67-0782ecd0770b=g%3Ab53dac57-7182-5aa4-0153-b78b858468e5%7Ce%3A1751713207844%7Cc%3A1751711407394%7Cl%3A1751711407844; _ga_GQ385NHRG1=GS2.1.s1751710101$o1$g1$t1751711417$j33$l0$h0; recommendations-home-category={"categoryId":1,"subCategoryId":21}; uzmx=7f900007cc16f0-e9b9-4f4e-a286-e6724b36573a1-17517043069487113031-e52f233ba27f77e3256'
        }
      })

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
