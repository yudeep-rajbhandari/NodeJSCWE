const { CweManager } = require('cwe-sdk')

const getCWEInfo =  (cweID) => {
    const cweManager = new CweManager()
    // const result = cweManager.getMemberships(cweID);
    const result = cweManager.isChildOf({ weaknessId: '117', parentId: '116' })
    console.log(result)
  };
  
const debug = require('debug')('cwe-tool')
const CWEDictionary = require('cwe-sdk/raw/cwe-dictionary.json')


  const getCweIds = ( cweIds, parentId, indirect = false )=> {
    let cweIdList = cweIds
    if (!Array.isArray(cweIds)) {
      cweIdList = [cweIds]
    }

    if (parentId) {
      return this.getCweIdsByParent({ cweIds: cweIdList, parentId, indirect })
    }

    const cweId = cweIdList[0]
    debug(`found [${!!cweId}] status for child/parent: [${cweId}/${parentId}]`)
    return this._getOneCweId({ cweId })
  }

  const getCweByName=(searchString )=> {
    const searchResults = []

    for (const [cweId, cweData] of Object.entries(CWEDictionary)) {
      if (cweData.attr['@_Name'].includes(searchString)) {
        debug(`found a match for search string: ${cweId}:${cweData.attr['@_Name']}`)
        searchResults.push(cweData)
      }
    }

    return searchResults
  }

  const getCweIdsByParent = ( cweIds, indirect = false, parentId )=> {
    const cweList = []
    cweIds.forEach(cweId => {
      const result = this.cweManager.isChildOf({
        weaknessId: String(cweId),
        parentId: String(parentId),
        indirect
      })
      debug(`found [${result}] status for child/parent: [${cweId}/${parentId}]`)
      if (result) {
        cweList.push(CWEDictionary[cweId])
      }
    })

    return cweList
  }

  const _getOneCweId = ( cweId )=> {
    return CWEDictionary[cweId]
  }


module.exports = {
getCWEInfo ,getCweIds,getCweByName,getCweIdsByParent,_getOneCweId
};