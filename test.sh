#!/bin/bash
rm output.txt tmp.txt
for i in `seq 1 50`;
do
		echo $i
        { time node main.js -i ./data/MI12.txt -o tmp.txt >>output.txt 2>&1; } 2>> output.txt
done


echo 'commandtime: '
grep commandtime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'pipetime: '
grep pipetime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'parseTime: '
grep parseTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'nonParseTime: '
grep nonParseTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'concatTime: '
grep concatTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'jsonTime: '
grep jsonTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'pushTime: '
grep pushTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'sliceTime: '
grep sliceTime output.txt | cut -d ' ' -f3 | awk ' OFMT = "%.0f" { sum += $1 } END { print sum*.01 }'

echo 'real: '
grep real output.txt | cut -d '	' -f2 | cut -b 3-8 | awk ' OFMT = "%.0f" { sum += sprintf("%f",$1) } END { print sprintf("%f", sum*.01) }'

echo 'user: '
grep user output.txt | cut -d '	' -f2 | cut -b 3-8 | awk ' OFMT = "%.0f" { sum += sprintf("%f",$1) } END { print sprintf("%f", sum*.01) }'

echo 'sys: '
grep sys output.txt | cut -d '	' -f2 | cut -b 3-7 | awk ' OFMT = "%.0f" { sum += sprintf("%f",$1) } END { print sprintf("%f", sum*.01) }'


# commandtime:
# 3442202
# pipetime:
# 601243
# parseTime:
# 1717505052
# nonParseTime:
# 939340619
# concatTime:
# 2506721
# sliceTime:
# 22158981
# real:
# 3.268780
# user:
# 2.695840
# sys:
# 0.295960

# commandtime:
# 2239131
# pipetime:
# 1122109
# parseTime:
# 1663447083
# nonParseTime:
# 971549486
# concatTime:
# 2744692
# jsonTime:
# 726260969
# pushTime:
# 155789576
# sliceTime:
# 15126234
# real:
# 3.254870
# user:
# 2.690140
# sys:
# 0.299980


# real	5m1.040s
# user	3m58.735s
# sys	0m22.889s