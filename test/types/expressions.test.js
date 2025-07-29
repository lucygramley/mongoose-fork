"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ArithmeticExpressionOperators
var abs1 = { $abs: '$date' };
var abs2 = { $abs: { $add: ['$price', '$fee'] } };
var add1 = { $add: ['$date', 3 * 24 * 60 * 60000] };
var add2 = { $add: ['$price', '$fee'] };
var ceil = { $ceil: '$value' };
var divide = { $divide: ['$hours', 8] };
var exp = { $exp: '$rate' };
var floor = { $floor: '$value' };
var ln = { $ln: '$sales' };
var log = { $log: ['$positiveInt', 2] };
var log10 = { $log10: '$H3O' };
var mod = { $mod: ['$hours', '$tasks'] };
var multiply1 = { $multiply: ['$price', '$quantity'] };
var multiply2 = { $multiply: ['$price', '$quantity', '$quantity'] };
var pow = { $pow: [{ $stdDevPop: '$scores.score' }, 2] };
var round1 = { $round: ['$value'] };
var round2 = { $round: ['$value', 1] };
var round3 = { $round: ['$value', -1] };
var sqrt = {
    $sqrt: {
        $add: [
            { $pow: [{ $subtract: ['$p2.y', '$p1.y'] }, 2] },
            { $pow: [{ $subtract: ['$p2.x', '$p1.x'] }, 2] }
        ]
    }
};
var subtract1 = { $subtract: ['$date', 3 * 24 * 60 * 60000] };
var subtract2 = { $subtract: ['$price', '$fee'] };
var trunc1 = { $trunc: ['$value', 1] };
var trunc2 = { $trunc: ['$value'] };
// TextExpressionOperators
var meta1 = { $meta: 'textScore' };
var meta2 = { $meta: 'indexKey' };
// TrigonometryExpressionOperators
var tanh1 = { $tanh: { $degreesToRadians: '$angle' } };
var isoWeekYear = { $isoWeekYear: { date: new Date('2017-01-02T00:00:00Z'), timezone: '-0500' } };
var millisecond1 = { $millisecond: new Date('2016-01-01') };
var millisecond2 = { $millisecond: { date: new Date('Jan 7, 2003') } };
var millisecond3 = { $millisecond: { date: new Date('August 14, 2011'), timezone: 'America/Chicago' } };
var millisecond4 = { $millisecond: '$date' };
var dateTrunc = {
    $dateTrunc: {
        date: '$orderDate', unit: 'week', binSize: 2,
        timezone: 'America/Los_Angeles', startOfWeek: 'Monday'
    }
};
var yearMonthDayUTCDateToString = { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
var timewithOffsetNYDateToString = { $dateToString: { format: '%H:%M:%S:%L%z', date: '$date', timezone: 'America/New_York' } };
var timewithOffset430DateToString = { $dateToString: { format: '%H:%M:%S:%L%z', date: '$date', timezone: '+04:30' } };
var minutesOffsetNYDateToString = { $dateToString: { format: '%Z', date: '$date', timezone: 'America/New_York' } };
var minutesOffset430DateToString = { $dateToString: { format: '%Z', date: '$date', timezone: '+04:30' } };
var bottom = {
    $bottom: {
        output: ['$playerId', '$score'],
        sortBy: { score: 1 }
    }
};
var bottomN = {
    $bottomN: {
        output: ['$playerId', '$score'],
        sortBy: { score: 1 },
        n: 3
    }
};
var firstN = {
    $firstN: {
        input: '$score',
        n: 3
    }
};
var lastN = {
    $lastN: {
        input: '$score',
        n: 3
    }
};
var maxN = {
    $maxN: {
        input: '$score',
        n: 3
    }
};
var minN = {
    $minN: {
        input: '$score',
        n: 3
    }
};
var top = {
    $top: {
        output: ['$playerId', '$score'],
        sortBy: { score: 1 }
    }
};
var topN = {
    $topN: {
        output: ['$playerId', '$score'],
        sortBy: { score: 1 },
        n: 3
    }
};
var d = { $avg: { $subtract: [{ $ifNull: ['$end', new Date()] }, '$start'] } };
var dateSubtract1 = {
    $dateSubtract: {
        startDate: new Date('2021-03-31T12:10:05Z'),
        unit: 'month',
        amount: 1
    }
};
var dateSubtract2 = {
    $dateSubtract: {
        startDate: '$logout',
        unit: 'hour',
        amount: 3,
        timezone: 'Europe/Amsterdam'
    }
};
var dateFromParts = {
    $dateFromParts: {
        year: 'asdf',
        hour: 'asdf'
    }
};
var accumulator = {
    $accumulator: {
        init: function () {
            return { count: 0, sum: 0 };
        },
        accumulate: function (state, numCopies) {
            return {
                count: state.count + 1,
                sum: state.sum + numCopies
            };
        },
        accumulateArgs: ['$copies'], // Argument required by the accumulate function
        merge: function (state1, state2) {
            return {
                count: state1.count + state2.count,
                sum: state1.sum + state2.sum
            };
        },
        finalize: function (state) {
            return (state.sum / state.count); // calculate the average
        },
        lang: 'js'
    }
};
var toObjectId = { $toObjectId: '1234567890' };
var type = { $type: '$a' };
var binarySize = { $binarySize: '$binary' };
var bsonSize = { $bsonSize: '$current_task' };
var functionExpr = {
    $function: {
        body: function (name) {
            return name == 'Detlef';
        },
        args: ['$name'],
        lang: 'js'
    }
};
var letExpr = {
    $let: {
        vars: {
            total: { $add: ['$price', '$tax'] },
            discounted: { $cond: { if: '$applyDiscount', then: 0.9, else: 1 } }
        },
        in: { $multiply: ['$$total', '$$discounted'] }
    }
};
var addWithNull = {
    $add: [
        '$price',
        { $ifNull: ['$tax', 0] }
    ]
};
var condWithIn = {
    $cond: {
        if: { $in: [] },
        then: '$foo',
        else: '$bar'
    }
};
var toLong = { $toLong: '$qty' };
var nullExpr = {
    $ne: null
};
var nullNETupleExpr = {
    $ne: ['$name', null]
};
var switchExpr = {
    $switch: {
        branches: [
            { case: { $eq: ['$name', 'Detlef'] }, then: 'Detlef' },
            { case: { $eq: ['$name', 'John'] }, then: 'John' }
        ],
        default: 'Hello'
    }
};
var filterExprMinimumRequiredFields = {
    $filter: {
        input: '$items',
        cond: { $gte: ['$$item.price', 100] }
    }
};
var filterExprAs = {
    $filter: {
        input: '$items',
        as: 'items',
        cond: { $gte: ['$$item.price', 100] }
    }
};
var filterLimit = {
    $filter: {
        input: '$items',
        cond: { $gte: ['$$item.price', 100] },
        limit: 5
    }
};
(function gh12058() {
    var concat = {
        $concatArrays: [
            {
                $cond: {
                    if: { $eq: ['foo', true] },
                    then: [1],
                    else: [2]
                }
            }
        ]
    };
})();
(function gh12149() {
    var count = { $count: '$value' };
})();
(function gh12417() {
    var query = [
        {
            $group: {
                group: {
                    $topN: {
                        output: ['$field'],
                        sortBy: {
                            field: -1.0
                        },
                        n: 7.0
                    }
                }
            }
        }
    ];
})();
function gh15209() {
    var query = [{ $group: { _id: null, median: { $median: { input: '$value', method: 'approximate' } } } }];
}
