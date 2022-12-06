const express = require('express')
const getCWEInfo = require('./cwe');
const app = express()
app.get('/:id',(req,res)=>{
    parentInfo = getCWEInfo._getOneCweId(req.params.id);
    // console.log(parentInfo)
    if(parentInfo["Related_Weaknesses"] !== undefined){
        console.log(parentInfo.Related_Weaknesses)
        p = getCWEInfo._getOneCweId(req.params.id).Related_Weaknesses.Related_Weakness;
        if( Array.isArray(p)){
            p = p[0]
        }
        res.send(p)
    }
    else{
        res.send(null)
    }

    

})

app.get('/consequence/:id',(req,res)=>{
    parentInfo = getCWEInfo._getOneCweId(req.params.id);
    // console.log(parentInfo)
    if(parentInfo["Common_Consequences"] !== undefined){
        console.log(parentInfo.Common_Consequences)
        p = parentInfo.Common_Consequences.Consequence;
        if(!Array.isArray(p)){
            k=[];
            k[0] = p;
            p=k;
           
        }
        p.forEach(t=>{
            if(!Array.isArray(t.Scope)){
                l=[];
                l[0]=t.Scope
                t.Scope = l;
                
            }
            if(!Array.isArray(t.Impact)){
                l=[];
                l[0]=t.Impact
                t.Impact = l;
                
            }
        })
        res.send(p)
    }
    else{
        res.send(null)
    }

    

})
app.get('/all/:id',(req,res)=>{
    parentInfo = getCWEInfo._getOneCweId(req.params.id);
    return res.send(parentInfo);
    // console.log(parentInfo)
    // if(parentInfo.hasOwnProperty("Related_Weaknesses")){
    //     console.log(parentInfo.Related_Weaknesses)
    //     p = getCWEInfo._getOneCweId(req.params.id).Related_Weaknesses.Related_Weakness;
    //     if( Array.isArray(p)){
    //         p = p[0]
    //     }
    //     res.send(p)
    // }
    // else{
    //     res.send(null)
    // }

    

})

app.get('/cwe2/:id',(req,res)=>{
    parentInfo = getCWEInfo._getOneCweId(req.params.id);

    if(parentInfo !== undefined && parentInfo["Related_Weaknesses"] !== undefined){
        console.log("1")
        p = parentInfo.Related_Weaknesses.Related_Weakness;
        // console.log(p)
        if(p instanceof Array){
            console.log("3")
            p.forEach(element => {
                console.log("4")
                k = element.attr;
                b =k["@_View_ID"]
                if(b=="1003"){
                    res.send(element)
                }

            });
        }
        else{
            console.log("<<<<<<<<<")
        }
        console.log("<<<<<<<<<")

        res.send(null);
    }
    else{
        res.send(null)
    }
   

})

app.get('/observed/:id',(req,res)=>{
    parentInfo = getCWEInfo._getOneCweId(req.params.id);


    if(parentInfo !== undefined && parentInfo["Observed_Examples"] !== undefined){
        console.log("1")
        p = parentInfo.Observed_Examples.Observed_Example;
  

        res.send(p);
    }
    else{
        res.send(null)
    }
   

})

app.listen(5000,()=>{
    console.log('App listenting on port 5000!');
})