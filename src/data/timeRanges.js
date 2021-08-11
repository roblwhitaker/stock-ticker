const timeRanges = [
    {
        period: '1D',
        avFunction: 'TIME_SERIES_INTRADAY',
        interval: '15min',
        dataName: "Time Series (15min)",
        format: 'HH',
        trim: 1
    },
    {
        period: '1W',
        avFunction: 'TIME_SERIES_INTRADAY',
        interval: '60min',
        dataName: "Time Series (60min)",
        trim: 7,
        format: 'dd'
    },
    {
        period: '1M',
        avFunction: 'TIME_SERIES_DAILY',
        interval: false,
        dataName: "Time Series (Daily)",
        trim: 30,
        format: 'dd'
    },
    {
        period: '6M',
        avFunction: 'TIME_SERIES_WEEKLY',
        interval: false,
        dataName: "Weekly Time Series",
        trim: 183,
        format: 'MMM'
    },
    {
        period: '1Y',
        avFunction: 'TIME_SERIES_WEEKLY',
        interval: false,
        dataName: "Weekly Time Series",
        trim: 365,
        format: 'MMM'
    },
    {
        period: 'MAX',
        avFunction: 'TIME_SERIES_MONTHLY',
        interval: false,
        dataName: "Monthly Time Series",
        trim: 7300,
        format: 'YYYY'
    },
]

export {timeRanges};