import { Component, AfterViewInit, OnInit, PipeTransform, Pipe, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import { AppService } from '../shared/app.service';
import { Chart, Highcharts } from 'angular-highcharts';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

var $;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnInit {
    displayedColumns = ['namaruangan', 'total', 'belumperiksa', 'diperiksa', 'batalregistrasi'];
    dataSource: MatTableDataSource<dataGridInfoRuangan>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataPasien: any;
    countRajal: 0;
    countIgd: 0;
    countRanap: 0;
    countRadiologi: 0;
    countLab: any;
    countBedah: any;
    countRehab: any;
    countTotal: any;
    countLakiDewasa: any;
    countAnakLaki: any;
    countBalitaLaki: any;
    countCeweDewasa: any;
    countAnakCewe: any;
    countBalitaCewe: any;

    gridInfoKedatangan: any;
    tempatTidurTerpakai: any;
    tempatTidurKosong: any;
    trendKunjungan: any;
    public now: Date = new Date();
    tanggal = new Date().toLocaleDateString();
    arr = this.tanggal.split('/');
    series = [];
    categories = [];
    // chart:any;
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
    data5 = [];
    colorNyieun = ['#7cb5ec', '#FF0000', '#C71585', '#434348', '#90ed7d', '#f7a35c',
        '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b',
        '#91e8e1', '#CD5C5C', '#FF69B4', '#FF8C00', '#9370DB', '#ADFF2F',
        '#00FF00', '#9ACD32', '#66CDAA', '#00FFFF', '#4682B4', '#800000',
        '#CD853F', '#191970', '#1E90FF', '#00CED1'];
    colors = Highcharts.getOptions().colors;
    dataChartKunjunganRs: any;
    resChartKunjunganRs: any;
    chartKunjunganRs: any;
    chart: any;
    chartKunjungnJenisPasien: any;
    datachartKunjungnJenisPasien: any;
    data10PerujukBpjs: any;
    chart10PerujukBpjs: any;
    chart10Diagnosa: any;
    data10Diagnosa: any;
    dataKunjunganRanap: any;
    chartKunjunganRanap: any;
    chartKunjunganFasilitasLain: any;
    dataKunjunganFasilitasLain: any;
    chartJenisPenjadwalanPie: any;
    dataJenisPenjadwalanPie: any;
    chartJenisPenjadwalanLine: any;
    datajenisPenjadwalanLine: any;
    constructor(public appservice: AppService) {
    }


    ngOnInit() {
  
        this.appservice.getTransaksi('eis/get-count-pasien').subscribe(data => {
            this.dataPasien = data;
            this.countRajal =  this.dataPasien.rawat_jalan ;
            this.countIgd =  this.dataPasien.igd ;
            this.countRanap =  this.dataPasien.rawat_inap ;
            this.countRadiologi =  this.dataPasien.radiologi ;
            this.countLab =  this.dataPasien.laboratorium ;
            this.countBedah =  this.dataPasien.operasi ;
            this.countRehab =  this.dataPasien.rehab_medik ;
            this.countTotal =  this.dataPasien.jumlah ;
        })
        this.appservice.getTransaksi('eis/get-tempattidur-terpakai').subscribe(data2 => {
            this.tempatTidurTerpakai = data2;
            this.countLakiDewasa=  this.tempatTidurTerpakai.lakidewasa;
            this.countAnakLaki =this.tempatTidurTerpakai.anaklaki;
            this.countBalitaLaki =this.tempatTidurTerpakai.balitalaki;
            this.countCeweDewasa =this.tempatTidurTerpakai.perempuandewasa;
            this.countAnakCewe =this.tempatTidurTerpakai.anakperempuan;
            this.countBalitaCewe =this.tempatTidurTerpakai.balitaperempuan;
        })
        this.appservice.getTransaksi('eis/get-tempattidur-perkelas').subscribe(data => {
            this.tempatTidurKosong = data;

        })
        this.appservice.getTransaksi('eis/get-info-kunjungan-rawatjalan').subscribe(data3 => {
            this.gridInfoKedatangan = data3;
            this.dataSource = new MatTableDataSource(this.gridInfoKedatangan);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    
        })

        this.appservice.getTransaksi('eis/get-trend-kunjungan-rawatjalan').subscribe(data => {
            this.trendKunjungan = data;
            for (var i in this.trendKunjungan) {
                this.data1.push({
                    y: parseFloat(this.trendKunjungan[i].totalterdaftar),
                    color: this.colorNyieun[i]
                });
            }
            for (var i in this.trendKunjungan) {
                this.data2.push({
                    y: parseFloat(this.trendKunjungan[i].diperiksa),
                    color: this.colorNyieun[i]
                });
            }
            for (var i in this.trendKunjungan) {
                this.data3.push({
                    y: parseFloat(this.trendKunjungan[i].belumperiksa),
                    color: this.colorNyieun[i]
                });
            }
            for (var i in this.trendKunjungan) {
                this.data4.push({
                    y: parseFloat(this.trendKunjungan[i].batalregistrasi),
                    color: this.colorNyieun[i]
                });
            }
            for (var i in this.trendKunjungan) {
                this.categories.push(this.trendKunjungan[i].tanggal);
            }
            // console.log(this.categories);
            this.chart = new Chart({
                chart: {
                    zoomType: 'x',
                    spacingRight: 20
                },
                title: {
                    text: ''
                },

                xAxis: {
                    categories: this.categories,
                    crosshair: true,
                    // type: 'datetime',
                    //  maxZoom: 24 * 3600 * 1000, // fourteen days
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Pasien'
                    }
                },
                tooltip: {
                    shared: true
                },
                legend: {
                    enabled: true
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0])]
                            ]
                        },
                        lineWidth: 1,
                        marker: {
                            enabled: true
                        },
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    },
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        },
                        showInLegend: true
                    },
                    //line: {
                    //    cursor: 'pointer',

                    //    dataLabels: {
                    //        enabled: true,
                    //        color: colors[0],
                    //        style: {
                    //            fontWeight: 'bold'
                    //        },
                    //        formatter: function () {
                    //            return Highcharts.numberFormat(this.y, 0, '.', ',');
                    //        }
                    //    },
                    //    showInLegend: true
                    //}
                },
                credits: {
                    enabled: false
                },

                series: [{
                    type: 'column',
                    name: 'Total Terdaftar',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: this.data1,

                },
                {
                    type: 'line',
                    name: 'Sudah Diperiksa',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: this.data2,
                },
                {
                    type: 'line',
                    name: 'Belum Diperiksa',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: this.data3,
                },
                {
                    type: 'line',
                    name: 'Batal Registrasi',
                    // pointInterval: 24 * 3600 * 1000,
                    // pointStart: Date.UTC(parseFloat(this.arr[2]), parseFloat(this.arr[1]) - 1, parseFloat('01')),
                    data: this.data4,
                }
                ]

            })

        })
        // chart jenis penjadwalan pie
        this.appservice.getTransaksi('eis/get-kunjungan-rawatinap').subscribe(data => {
            this.dataKunjunganRanap = data;

            var series = [];
            var categories = [];
            var loopIndex = 0;
            for (var i in this.dataKunjunganRanap) {
                categories.push(this.dataKunjunganRanap[i].namaruangan);
                var dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.dataKunjunganRanap[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.dataKunjunganRanap[i].namaruangan,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chartJenisPenjadwalanPie = new Chart({
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: [
                        ['Bananas', 8],
                        ['Kiwi', 3],
                        ['Mixed nuts', 1],
                        ['Oranges', 6],
                        ['Apples', 8],
                        ['Pears', 4],
                        ['Clementines', 4],
                        ['Reddish (bag)', 1],
                        ['Grapes (bunch)', 1]
                    ]
                }]
            })

            // line
            this.chartJenisPenjadwalanLine = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },

                series: series,
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                // responsive: {
                //     rules: [{
                //         condition: {
                //             maxWidth: 500
                //         },
                //         chartOptions: {
                //             legend: {
                //                 layout: 'horizontal',
                //                 align: 'center',
                //                 verticalAlign: 'bottom'
                //             }
                //         }
                //     }]
                // }
            })
        })
        // end pie
        this.appservice.getTransaksi('eis/get-kunjungan-rs').subscribe(data => {
            this.resChartKunjunganRs = data;
            this.chartKunjunganRs = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    enabled: true,
                },
                series: [
                    {
                        name: 'Instalasi Rawat Jalan',
                        data: [this.resChartKunjunganRs.rawatjalan]
                    },
                    {
                        name: 'Instalasi Rawat Inap',
                        data: [this.resChartKunjunganRs.rawatinap]
                    }, {
                        name: 'Instalasi Gawat Darurat',
                        data: [this.resChartKunjunganRs.igd]
                    },
                    {
                        name: 'Instalasi Rehabilitasi Medik',
                        data: [this.resChartKunjunganRs.rehabmedik]
                    },

                ]
            })

        })
        //   chart kunjungan berdasarkan jenispasien
        this.appservice.getTransaksi('eis/get-kunjungan-perjenispasien').subscribe(data => {
            this.datachartKunjungnJenisPasien = data;

            var dataz = [];
            var slice = true;
            for (var i in this.datachartKunjungnJenisPasien) {
                // var sum = _.reduce( this.datachartKunjungnJenisPasien[i],
                //     function (memo, num) {
                //         return memo + Number(num.SumPatient);
                //     }, 0);
                dataz.push({
                    name: this.datachartKunjungnJenisPasien[i].kelompokpasien,
                    y: parseFloat(this.datachartKunjungnJenisPasien[i].jumlah),
                    sliced: slice,
                    selected: slice
                });
                slice = false;
            }
            this.chartKunjungnJenisPasien = new Chart({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function () {
                                return this.percentage.toFixed(2) + ' %';
                            }
                        },
                        showInLegend: true
                    },

                },
                credits: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: 'Persentase Kunjungan Pasien',
                    // colorByPoint: true,
                    data: dataz
                    //  [{
                    //     name: 'Umum/Pribadi',
                    //     y: parseFloat(this.datachartKunjungnJenisPasien[0].jmlUmum),
                    //     sliced: true,
                    //     selected: true
                    // }, {
                    //     name: 'BPJS',
                    //     y: parseFloat( this.datachartKunjungnJenisPasien[0].jmlBPJS)
                    // }, {
                    //     name: 'Asuransi Lain',
                    //     y:  parseFloat(this.datachartKunjungnJenisPasien[0].jmlAsuransiLain)
                    // }, {
                    //     name: 'Perusahaan',
                    //     y:  parseFloat(this.datachartKunjungnJenisPasien[0].jmlPerusahaan)
                    // }, {
                    //     name: 'Perjanjian',
                    //     y:  parseFloat(this.datachartKunjungnJenisPasien[0].jmlPerjanjian)
                    // } ]
                }]
            })
        })
        // end




        //   chart 10 Besar Asal Perujuk Pasien BPJS
        this.appservice.getTransaksi('eis/get-topten-asalperujuk-bpjs').subscribe(data => {
            this.data10PerujukBpjs = data;

            var pie1 = 2;
            var series = [];
            var categories = [];
            var loopIndex = 0;
            for (var i in this.data10PerujukBpjs) {
                categories.push(this.data10PerujukBpjs[i].ppkrujukan);
                var dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.data10PerujukBpjs[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.data10PerujukBpjs[i].ppkrujukan,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chart10PerujukBpjs = new Chart({
                chart: {
                    type: 'column',
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah "],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        var point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien <br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

            })
        })
        // end
        //   chart 10 Besar Diagnosa
        this.appservice.getTransaksi('eis/get-topten-diagnosa').subscribe(data => {
            this.data10Diagnosa = data;

            var pie1 = 2;
            var series = [];
            var categories = [];
            var loopIndex = 0;
            for (var i in this.data10Diagnosa) {
                categories.push(this.data10Diagnosa[i].kddiagnosa);
                var dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.data10Diagnosa[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.data10Diagnosa[i].kddiagnosa,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chart10Diagnosa = new Chart({
                chart: {
                    type: 'column',
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah "],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        var point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien <br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

            })
        })
        // end

        //   chart kunjungan Pasien Rawat Inap
        this.appservice.getTransaksi('eis/get-kunjungan-rawatinap').subscribe(data => {
            this.dataKunjunganRanap = data;

            var series = [];
            var categories = [];
            var loopIndex = 0;
            for (var i in this.dataKunjunganRanap) {
                categories.push(this.dataKunjunganRanap[i].namaruangan);
                var dataz2 = [];
                dataz2.push({
                    y: parseFloat(this.dataKunjunganRanap[i].jumlah),
                    color: this.colors[i]
                });
                if (loopIndex < 10)
                    series.push({
                        name: this.dataKunjunganRanap[i].namaruangan,
                        data: dataz2
                    });
                loopIndex++;

            }
            this.chartKunjunganRanap = new Chart({
                chart: {
                    type: 'column',
                },

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ["Jumlah "],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                plotOptions: {
                    column: {
                        // url:"#",
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],

                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                tooltip: {
                    formatter: function () {
                        var point = this.point,
                            s = this.x + ':' + Highcharts.numberFormat(this.y, 0, '.', ',') + '<br/>';
                        return s;

                    }
                    // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    //     '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    // footerFormat: '</table>',
                    // shared: true,
                    // useHTML: true
                },
                series: series,
                exporting: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },

            })
        })
        // end

        this.appservice.getTransaksi('eis/get-kunjungan-rs').subscribe(data => {
            this.dataKunjunganFasilitasLain = data;
            this.chartKunjunganFasilitasLain = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jumlah'],
                    labels: {
                        align: 'center',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Kunjungan Pasien'
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',

                        dataLabels: {
                            enabled: true,
                            color: this.colors[1],
                            style: {
                                fontWeight: 'none'
                            },
                            formatter: function () {
                                return Highcharts.numberFormat(this.y, 0, '.', ',') + ' Pasien';
                            }
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    enabled: true,
                },
                series: [
                    {
                        name: 'Instalasi Laboratorium',
                        data: [this.resChartKunjunganRs.laboratorium]
                    }, {
                        name: 'Instalasi Radiologi',
                        data: [this.resChartKunjunganRs.radiologi]
                    },

                ]
            })

        })



    }

    /**
     * @method ngAfterViewInit
     */
    ngAfterViewInit() {
        Prism.highlightAll();

    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }



}
// function createNewUser(id: number): UserData {
//     const name =
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//     return {
//       id: id.toString(),
//       name: name,
//       progress: Math.round(Math.random() * 100).toString(),
//       color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//     };
//   }

/** Constants used to fill up our data base. */
//   const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//     'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
//   const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//     'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//     'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface dataGridInfoRuangan {
    namaruangan: string;
    belumperiksa: string;
    diperiksa: string;
    batalregistrasi: string;
    total: string;
}

