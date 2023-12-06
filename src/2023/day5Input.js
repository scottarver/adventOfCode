"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day5Input = void 0;
exports.day5Input = "seeds: 3082872446 316680412 2769223903 74043323 4131958457 99539464 109726392 353536902 619902767 648714498 3762874676 148318192 1545670780 343889780 4259893555 6139816 3980757676 20172062 2199623551 196958359\n\nseed-to-soil map:\n2211745924 1281207339 39747980\n3648083739 2564129012 145170114\n4171944574 2333022880 44675857\n540694760 848661020 78793182\n256996824 588160543 260500477\n1870557289 1804847051 174857657\n3877597859 2853012070 228980636\n1634159465 2150723562 100770342\n3793253853 2293912908 39109972\n652571990 567856215 20304328\n2480343183 3372556760 130573730\n1831144195 528443121 39413094\n0 1690920197 113926854\n3145720856 3081992706 290564054\n624623106 1979704708 27948884\n3844601856 3751059243 32996003\n1260492360 1175075910 106131429\n1366623789 166330978 138490835\n1175000149 927454202 85492211\n696570061 1596389312 94530885\n2647046837 3784055246 498674019\n4216620431 2709299126 78346865\n953230443 1450000160 146389152\n791100946 1012946413 162129497\n1734929807 427093569 96214388\n672876318 403399826 23693743\n113926854 2007653592 143069970\n2045414946 0 166330978\n1099619595 328019272 75380554\n3832363825 4282729265 12238031\n619487942 523307957 5135164\n517497301 304821813 23197459\n2293912908 2377698737 186430275\n1505114624 1320955319 129044841\n2610916913 3714929319 36129924\n3436284910 3503130490 211798829\n4106578495 2787645991 65366079\n\nsoil-to-fertilizer map:\n2733576308 471599794 76965554\n1171423854 1329782324 37554133\n2640052871 928987130 93523437\n2015828352 548565348 204028986\n3562821857 3651707516 643259780\n1208977987 2596877127 12575372\n778871551 2204324824 392552303\n1221553359 2609452499 201089363\n3520687457 3069361301 42134400\n4240454288 3542205804 54513008\n2219857338 1367336457 420195533\n3034988650 3111495701 430710103\n307271757 0 471599794\n1422642722 2082393746 121931078\n3465698753 3596718812 54988704\n0 1022510567 307271757\n1544573800 1787531990 294861756\n4206081637 3034988650 34372651\n1839435556 752594334 176392796\n\nfertilizer-to-water map:\n1807260819 3957534991 337432305\n774926879 2718324291 701236360\n2351569884 1690420176 794087185\n313174888 2484507361 233816930\n3145657069 541109949 949949029\n546991818 313174888 227935061\n2144693124 3750658231 206876760\n4095606098 1491058978 199361198\n1476163239 3419560651 331097580\n\nwater-to-light map:\n3834982820 3688486185 202897824\n2016707141 372287565 116618935\n3386838019 3412408553 81116937\n1125723906 705568567 205087174\n4037880644 1840142480 150018623\n2359176858 4109550629 126312910\n3328178239 4050890849 58659780\n1801115923 3893484758 43944958\n1516002989 1645262885 194879595\n3501845456 488906500 216662067\n1373868013 2223115169 142134976\n3467954956 3641943956 33890500\n1845060881 3937429716 113461133\n3718507523 910655741 57371540\n3315526510 3675834456 12651729\n2936874590 2031117287 84929853\n1710882584 3551710617 90233339\n372287565 2365250145 753436341\n2133326076 968027281 225850782\n1330811080 1990161103 40956184\n1958522014 3493525490 58185127\n3021804443 3118686486 293722067\n2485489768 1193878063 451384822\n3775879063 4235863539 59103757\n1371767264 3891384009 2100749\n4187899267 2116047140 107068029\n\nlight-to-temperature map:\n156743496 2059819668 37694357\n4058204935 4136802755 38991573\n2484168315 1803830764 54458297\n2053264847 2531370441 7735546\n586814267 2539105987 96956250\n2538626612 2097514025 117228608\n4097196508 3782742182 197770788\n1246999413 607900903 25957627\n1877009740 1752361784 30081637\n683770517 3121708332 89729874\n1835387899 343006762 41621841\n1806332066 3242032508 29055833\n2212907940 137512351 205494411\n809588378 2954088675 69458905\n1689902424 3271088341 436818\n3306521233 894737794 308504080\n3235066415 3050253514 71454818\n1147299995 1960120250 99699418\n2046683718 749851354 6581129\n3782742182 4222506720 5456115\n2061000393 756432483 138305311\n792839631 591152156 16748747\n1478425864 2742612115 211476560\n2793367571 2636062237 73608402\n2471831801 2214742633 12336514\n194437853 1622309324 130052460\n3901915150 3980512970 156289785\n2655855220 0 137512351\n324490313 1359985370 262323954\n3855202758 4175794328 46712392\n2445108285 1782443421 21387343\n2467550357 3211438206 4281444\n3788198297 4227962835 67004461\n2199305704 2709670639 13602236\n1272957040 385683332 205468824\n1690339242 633858530 115992824\n1907091377 2227079147 139592341\n0 1203241874 156743496\n2866975973 1858289061 24590288\n1120987137 3215719650 26312858\n2891566261 3271525159 343500154\n2466495628 384628603 1054729\n1043746236 1882879349 77240901\n879047283 2366671488 164698953\n773500391 2723272875 19339240\n2418402351 3023547580 26705934\n\ntemperature-to-humidity map:\n159374282 333555332 155635040\n2263203984 507165487 202752561\n1337996197 836383358 269347352\n733930089 139752127 104367475\n2840449774 3878218681 416748615\n3373626730 3111757526 416998602\n3943881399 2795875886 241056063\n3790625332 2642619819 153256067\n3298801153 3036931949 30341941\n1671783850 1980182260 485774285\n0 313933177 19622155\n2642619819 3680388726 197829955\n2157558135 1398186167 105645849\n4283100212 3528756128 11867084\n843670838 1503832016 347905328\n1607343549 244119602 64440301\n315009322 709918048 126465310\n441474632 1105730710 292455457\n3257198389 3540623212 41602764\n838297564 308559903 5373274\n1320021082 489190372 17975115\n4184937462 3582225976 98162750\n1191576166 1851737344 128444916\n3329143094 3067273890 44483636\n19622155 0 139752127\n\nhumidity-to-location map:\n3728200417 3220538748 36833684\n1907946842 1065499951 70751518\n1978698360 2011387412 298481649\n4048923771 3541262102 246043525\n1314245652 402299218 396512619\n577039234 798811837 266688114\n3249926596 2795059130 273974120\n1734859977 229212353 173086865\n2718652009 3787305627 454867466\n1710758271 1405898165 24101706\n843727348 1510857580 66114574\n3765034101 3257372432 283889670\n1179488618 1876630378 134757034\n909841922 1136251469 269646696\n3675406214 4242173093 52794203\n310070062 1576972154 266969172\n229212353 1429999871 80857709\n3523900716 3069033250 151505498\n3173519475 2718652009 76407121\n2277180009 1843941326 32689052";
