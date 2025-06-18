const MADLAN_QUERY = `
query searchPoi($dealType: String, $userContext: JSONObject, $abtests: JSONObject, $noFee: Boolean, $adPlacement: AdPlacement, $priceRange: [Int], $ppmRange: [Int], $monthlyTaxRange: [Int], $roomsRange: [Int], $bathsRange: [Float], $buildingClass: [String], $amenities: inputAmenitiesFilter, $generalCondition: [GeneralCondition], $sellerType: [SellerType], $floorRange: [Int], $areaRange: [Int], $tileRanges: [TileRange], $tileRangesExcl: [TileRange], $sort: [SortField], $limit: Int, $offset: Int, $cursor: inputCursor, $poiTypes: [PoiType], $locationDocId: String, $searchContext: SearchContext, $underPriceEstimation: Boolean, $discountedProjects: Boolean, $priceDrop: Boolean, $isCommercialRealEstate: Boolean, $commercialAmenities: inputCommercialAmenitiesFilter, $qualityClass: [String], $numberOfEmployeesRange: [Float], $creationDaysRange: Int) {
  searchPoiV2(noFee: $noFee, adPlacement: $adPlacement, dealType: $dealType, userContext: $userContext, abtests: $abtests, priceRange: $priceRange, ppmRange: $ppmRange, monthlyTaxRange: $monthlyTaxRange, roomsRange: $roomsRange, bathsRange: $bathsRange, buildingClass: $buildingClass, sellerType: $sellerType, floorRange: $floorRange, areaRange: $areaRange, generalCondition: $generalCondition, amenities: $amenities, tileRanges: $tileRanges, tileRangesExcl: $tileRangesExcl, sort: $sort, limit: $limit, offset: $offset, cursor: $cursor, poiTypes: $poiTypes, locationDocId: $locationDocId, discountedProjects: $discountedProjects, searchContext: $searchContext, underPriceEstimation: $underPriceEstimation, priceDrop: $priceDrop, isCommercialRealEstate: $isCommercialRealEstate, commercialAmenities: $commercialAmenities, qualityClass: $qualityClass, numberOfEmployeesRange: $numberOfEmployeesRange, creationDaysRange: $creationDaysRange) {
    total
    cursor {
      bulletinsOffset
      projectsOffset
      seenProjects
      __typename
    }
    totalNearby
    lastInGeometryId
    cursor {
      bulletinsOffset
      projectsOffset
      __typename
    }
    ...PoiFragment
    __typename
  }
}

fragment PoiFragment on PoiSearchResult {
  poi {
    ...PoiInner
    ... on Bulletin {
      rentalBrokerFee
      investorsData {
        yield
        approximateRent
        updatedAt
        __typename
      }
      eventsHistory {
        eventType
        price
        date
        __typename
      }
      insights {
        insights {
          category
          tradeoff {
            insightPlace
            value
            tagLine
            impactful
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment PoiInner on Poi {
  id
  locationPoint {
    lat
    lng
    __typename
  }
  type
  firstTimeSeen
  addressDetails {
    docId
    city
    borough
    zipcode
    streetName
    neighbourhood
    neighbourhoodDocId
    cityDocId
    resolutionPreferences
    streetNumber
    unitNumber
    district
    __typename
  }
  ... on Project {
    discount {
      showDiscount
      description
      bannerUrl
      __typename
    }
    dealType
    phoneNumber
    apartmentType {
      size
      beds
      apartmentSpecification
      type
      price
      __typename
    }
    bedsRange {
      min
      max
      __typename
    }
    priceRange {
      min
      max
      __typename
    }
    images {
      path
      __typename
    }
    promotionStatus {
      status
      __typename
    }
    projectName
    projectLogo
    isCommercial
    projectMessages {
      listingDescription
      __typename
    }
    previewImage {
      path
      __typename
    }
    developers {
      id
      logoPath
      __typename
    }
    tags {
      bestSchool
      bestSecular
      bestReligious
      safety
      parkAccess
      quietStreet
      dogPark
      familyFriendly
      lightRail
      commute
      __typename
    }
    buildingStage
    blockDetails {
      buildingsNum
      floorRange {
        min
        max
        __typename
      }
      units
      mishtakenPrice
      urbanRenewal
      __typename
    }
    __typename
  }
  ... on CommercialBulletin {
    address
    agentId
    qualityClass
    amenities {
      accessible
      airConditioner
      alarm
      conferenceRoom
      doorman
      elevator
      fullTimeAccess
      kitchenette
      outerSpace
      parkingBikes
      parkingEmployee
      parkingVisitors
      reception
      secureRoom
      storage
      subDivisible
      __typename
    }
    area
    availabilityType
    availableDate
    balconyArea
    buildingClass
    buildingType
    buildingYear
    currency
    dealType
    description
    estimatedPrice
    lastUpdated
    eventsHistory {
      eventType
      price
      date
      __typename
    }
    feeType
    floor
    floors
    fromDateTime
    furnitureDetails
    generalCondition
    images {
      ...ImageItem
      __typename
    }
    lastActiveMarkDate
    leaseTerm
    leaseType
    matchScore
    monthlyTaxes
    newListing
    numberOfEmployees
    originalId
    poc {
      type
      ... on BulletinAgent {
        madadSearchResult
        officeId
        officeContact {
          imageUrl
          __typename
        }
        exclusivity {
          exclusive
          __typename
        }
        __typename
      }
      __typename
    }
    ppm
    price
    qualityBin
    rentalBrokerFee
    rooms
    source
    status {
      promoted
      __typename
    }
    url
    virtualTours
    __typename
  }
  ... on Bulletin {
    dealType
    address
    matchScore
    beds
    floor
    baths
    buildingYear
    area
    price
    virtualTours
    rentalBrokerFee
    generalCondition
    lastUpdated
    promotedUntil
    eventsHistory {
      eventType
      price
      date
      __typename
    }
    status {
      promoted
      __typename
    }
    poc {
      type
      ... on BulletinAgent {
        madadSearchResult
        officeId
        officeContact {
          imageUrl
          __typename
        }
        exclusivity {
          exclusive
          __typename
        }
        __typename
      }
      __typename
    }
    tags {
      bestSchool
      bestSecular
      bestReligious
      safety
      parkAccess
      quietStreet
      dogPark
      familyFriendly
      lightRail
      commute
      __typename
    }
    commuteTime
    dogsParkWalkTime
    parkWalkTime
    buildingClass
    images {
      ...ImageItem
      __typename
    }
    __typename
  }
  ... on Ad {
    addressDetails {
      docId
      city
      borough
      zipcode
      streetName
      neighbourhood
      neighbourhoodDocId
      resolutionPreferences
      streetNumber
      unitNumber
      __typename
    }
    city
    district
    firstTimeSeen
    id
    locationPoint {
      lat
      lng
      __typename
    }
    neighbourhood
    type
    __typename
  }
  __typename
}

fragment ImageItem on ImageItem {
  description
  imageUrl
  isFloorplan
  rotation
  __typename
}
`;

export default MADLAN_QUERY;
