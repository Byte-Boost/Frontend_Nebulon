import '@/app/globals.css'
import GraphCard from '@/modules/graph_card';
import ContentArea from '@/modules/content_area';
//import TopBar from '@/modules/topbar';
import Sidebar from '@/modules/sidebar';
import Head from 'next/head';
import ChartTemplate from '@/modules/chart_template/index';
export default function Home() {

    // json data for testing bar chart 
    const data = require('@/json/test.json')
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Calculate the total sales value for the product with ID x
    let dataX = [...new Set(data['Planilha1']['ID Produto'])].sort();
    let dataY = Array(dataX.length).fill(0);

    for (let i = 0; i < data['Planilha1']['ID Produto'].length; i++) {
        dataY[(Number(data['Planilha1']['ID Produto'][i]))-1] += data['Planilha1']['Valor de Venda'][i]
    }

    for (let id in data['Planilha1']['ID Produto']){
      dataY[Number(id)-1] += data['Planilha1']['Valor de Venda'][Number(id)-1]
    }

    // Calculate the total sales value for each month
    let dataX2 = months;
    let dataY2 = Array(12).fill(0);

    for (let i = 0; i < data['Planilha1']['Data da venda'].length; i++) {
        let mon = data['Planilha1']['Data da venda'][i]
        dataY2[(Number(mon.substring(3, 5)))-1] = data['Planilha1']['Valor de Venda'][i]
    }

    //Chart Colors
    let pieColors = ['rgba(210,65,108,0.7)', 'rgba(65,210,108,0.7)', 'rgba(108,65,210,0.7)'];
    let defaultColor = ['rgba(210,65,108,0.7)']

  return (
    <main>
        <Head>
        <title>Nebulon - Dashboard</title>
        </Head>
        {/* <TopBar/> */}
        <Sidebar/>
        <ContentArea>
          <div className='flex grow flex-wrap gap-8 m-8 place-content-center'>

            <GraphCard title='Vendas por Mês' width='50rem' height='25rem'>
              <ChartTemplate type='line' id='VendasEmR$' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX2} dataY = {dataY2} colors = {defaultColor}/>
            </GraphCard> 

            <GraphCard title='Vendas por Produto' width='50rem' height='25rem'>
              <ChartTemplate type='bar' id='VendasEmR$2' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY} colors = {defaultColor}/>
            </GraphCard> 

             
            <GraphCard title='Vendas por Produto' width='25rem' height='25rem'>
              <ChartTemplate type='pie' id='VendasEmR$3' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY} colors = {pieColors}/>
            </GraphCard> 

            {/*
            <GraphCard title='Vendas Em R$' width='50rem' height='25rem'>
              <ChartTemplate type='bar' id='VendasEmR$4' width='100%' height='20rem' title='Vendas Em R$' dataX = {dataX} dataY = {dataY}/>
            </GraphCard> 
            */}

          </div>
        </ContentArea>
    </main>
  );
}

