import * as Handlebars from 'handlebars';
const html = `<!DOCTYPE html>
<html>
   <head>
      <title>notes</title>
      <style type="text/css">
         .text-center{text-align: center !important;}
         .text-center p{font-size: 18px;}
         .head{padding: 10px 25px;}
         .head{display: flex;}
         .note{color: #1a1a1a; min-height: 200px; padding: 15px; font-size:12px;}
         .sign{width: 150px;}
         .right{position: absolute;top: -3px;right: 15px;}
         .p-t{padding-top: 7px; margin-bottom: 0px; padding-bottom: 0px;}
         .top-div{position: relative; padding-left: 15px; margin-top: 40px;}
         .small{font-size: 12px;margin: 0px;}
         .name{margin-bottom:0px; width: 73%;}
         .logo{width: 140px; max-height: 160px;}
         .foot img{width: 140px; max-height: 140px;}
         .foot{text-align: left; padding-left:15px;}
         .logo img{width: 200px;}
         .header{width: 69%; text-align: right;}
         .header p{margin-bottom: 0px;}
      </style>
   </head>
   <body>
      <div class="head">
        <div class="logo">
          <img src="{{logoImg}}" style="width: {{logoWidth}}px; height: {{logoHeight}}px;">
        </div>
        <div class="header">
          <p>
           {{headerP}}
          </p>
      </div>
    </div>
      <div class="top-div">
         <div>
            <p class="p-t">To: {{toName}}</p>
            <p class="small">{{toAddress}}</p>
            <p class="small">{{toCity}}</p>
            <p class="small">{{toProvince}}</p>
            <p class="small">Phone: {{toPhone}}</p>
            <p class="small">Fax: {{toFax}}</p>
            <p class="small">CC: {{toCC}}</p>
            <div class="p-d">
            <p class="name">CustomDate: {{customDate}}</p>
            <div>
            <div class="p-t" style="display:flex;">
               <p class="name">Re: {{pName}}</p>
               <p style="margin-bottom: 0px;">DOB: {{pDOB}}</p>
            </div>
            <hr/>
            <p style="margin-top: 0;">Health Card No: {{pHCN}}</p>
         </div>
      </div>
      <br>
      <br>
      <br>
      <div class="note" style="{{bodyStyle}}">{{noteText}}</div>
      <div class="foot">
         <img src="{{signImg}}" alt="">
         <p>{{footerP}}</p>
      </div>
   </body>
</html>
`;

const htmlWithoutNoteTo = `<!DOCTYPE html>
<html>
   <head>
      <title>notes</title>
      <style type="text/css">
         .text-center{text-align: center !important;}
         .text-center p{font-size: 18px;}
         .head{padding: 10px 25px;}
         .head{display: flex;}
         .note{color: #1a1a1a; min-height: 200px; padding: 15px; font-size:12px;}
         .sign{width: 150px;}
         .right{position: absolute;top: -3px;right: 15px;}
         .p-d{padding-top: 5px; margin-bottom: 0px; padding-bottom: 0px;}
         .p-t{padding-top: 7px; margin-bottom: 0px; padding-bottom: 0px;}
         .top-div{position: relative; padding-left: 15px; margin-top: 40px;}
         .small{font-size: 12px;margin: 0px;}
         .name{margin-bottom:0px; width: 73%;}
         .logo{width: 140px; max-height: 160px;}
         .foot img{width: 140px; max-height: 140px;}
         .foot{text-align: left; padding-left:15px;}
         .logo img{width: 200px;}
         .header{width: 69%; text-align: right;}
         .header p{margin-bottom: 0px;}
      </style>
   </head>
   <body>
      <div class="head">
        <div class="logo">
          <img src="{{logoImg}}" style="width: {{logoWidth}}px; height: {{logoHeight}}px;">
        </div>
        <div class="header">
          <p>
            {{headerP}}
          </p>
      </div>
    </div>
      <div class="top-div">
         <div>
            <p class="small">Fax: {{toFax}}</p>
            <p class="small">CC: {{toCC}}</p>
            <div class="p-d">
            <p class="name">CustomDate: {{customDate}}</p>
            <div>
            <div class="p-t" style="display:flex;">
               <p class="name">Re: {{pName}}</p>
               <p style="margin-bottom: 0px;">DOB: {{pDOB}}</p>
            </div>
            <hr/>
            <p style="margin-top: 0;">Health Card No: {{pHCN}}</p>
         </div>
      </div>
      <br>
      <br>
      <br>
      <div class="note">{{noteText}}</div>
      <div class="foot">
         <img src="{{signImg}}" alt="">
         <p>{{footerP}}</p>
      </div>
   </body>
</html>
`;

// <img src="{{signImg}}" alt="sign sample" class="sign">
export const getTemplate = async (context, data) => {
  let htmlContext = '';

  if (data.flag === 0) {
    htmlContext = html
      .replace('{{headerP}}', data.headP)
      .replace('{{noteText}}', data.note.replace(/\n/g, '<br />'))
      .replace('{{footerP}}', data.footerP);
  } else if (data.flag == 1) {
    htmlContext = htmlWithoutNoteTo
      .replace('{{headerP}}', data.headP)
      .replace('{{noteText}}', data.note.replace(/\n/g, '<br />'))
      .replace('{{footerP}}', data.footerP);
  }
  return Handlebars.compile(htmlContext)(context);
};
