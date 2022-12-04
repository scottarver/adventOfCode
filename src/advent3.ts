import {
    chunk,
    intersection,
} from 'lodash';

const testInput1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const getPriority = (input: string): number => {
    // char to decimal
    const value: number = input.codePointAt(0) as number;
    const isLowerCase: boolean = (value >= ('a'.codePointAt(0) as number)) && (value <= ('z'.codePointAt(0) as number));
    const base: number = isLowerCase ? 'a'.codePointAt(0) as number : ('A'.codePointAt(0) as number);
    // console.log({input, value, isLowerCase, base });
    return value - base + 1 + (isLowerCase ? 0 : 26);
};

const advent3a = (input: string): number => {
    const lines = input.split('\n');
    const linesPri = lines.map((line) => {
        const lineLength = line.length;
        // first half of the line
        const firstHalf = line.slice(0, Math.floor(lineLength / 2));
        // second half of the line
        const secondHalf = line.slice(Math.floor(lineLength / 2), lineLength);
        // the 2 sides should be the same
        if (firstHalf.length !== secondHalf.length) {
            console.log({ firstHalf, secondHalf });
            throw new Error('lines not the same size');
        }

        const commonBetween = intersection(firstHalf.split(''), secondHalf.split(''));
        if (commonBetween.length > 1) {
            throw new Error('more than one character is common');
        }

        const common = commonBetween[0];

        console.log(common, getPriority(common))
        return getPriority(common);
    });
    console.log(linesPri);
    return linesPri.reduce((a, b) => a + b, 0);
};

// console.log(advent3a(testInput1));
const input1 = `BzRmmzZHzVBzgVQmZLPtqqffPqWqJmPLlL
hpvvTDcrCjhpcrvcGGhfLHMlLtMCqflNlWPJlJ
hGjhncHhGnhbTHczBBZVVSbRwgSgRV
rWVQjPQQjGRWNSrWrPjcptwBpqqJBtJBBcZgMdtq
zzmmpzfTCFpTlMlJJwBgMlqMBt
TvLszpbhhTLmsnRQPDQGWDWRvQSR
zGzvLlGlQHLGBQZlhBWhdjRdmdWRcjPj
fTJNfTfNSRWPhjdjfj
pbsbVVnpSnbVTprnbqqrzvLLgQlGLPLHll
ZCCCsWvNvmsCsCmZLZmgMLRpQMhwQRpQRfphfprpTfpM
tlncPjzlndctbzcPPBcjwDphwrfGGDffbDRpDTGG
cdqnddwzqjNVWVLZZLZq
DTLbDbRrlQbwhhNrmmfwdt
zzMJMzjCjJJjvLjMPJpcgPpzfhHdfqWcqddwtwfqdttcNtdN
pJCzVpCvDZBLsVRQ
STzBBbJzRRBZBRTqCCsfZLtNNLClCsfh
jsQnnQjjHcvQFrcPwCmtLCNlvDfftfff
sGFscMQQMMpqzqbMbd
QlNDWGsjQjgQllWQsbtzqTJczTJcbFmmFJJP
MhLrhgLVndRmzJFzVqqJqP
pSLnMdwhwdRZRSwhLZwLhdGWQjlsgWjNQWWSvgBsWDlj
THjSRFSddTjdBTcPLcVVvVBw
GzWnWfndWfznDfsnsBsPVwVwPPLL
zNflzJWqqzQDdSStHNZNpFFtbj
FSzDmsFSFlDlBzqVjqHHjHHpVgHLbp
rTrTtTQQntRQnQJQgggHZttVgHLBLhZL
WTJJRRQCRRJTRdBCRdvRNDFSWFMPmDlPPSsNPSzS
WQldlMtMVQgVMQHnDGbHGGnRnQmD
rqcZPrCFjmHlbGjZ
zSScchqwchBzTzFzhhSlcCwNtdVWWJgsVdMtWNgNVWTJTd
lMZqjMWllrTTspjprWWSSwgWNSVNDmWGVwFwgN
cdCCdLHcnndHJnmCRntLBnRzDvFNtNDVzgSgwDgFNVzFVv
BRLcCCJCmJdcRhfjPPZphrlrPqlZ
GdGqcrrZGDrvDJJqJHcBvmFFgmFMMgMgBtMLTssLmF
NbPVPDlljPmTmsTj
VfQDhflCCRWdcrQwJvvnJv
RLcWgLCqqPQLcqZwzHgwmmrmmtgwTw
DhbhNrMpnJSDJwVTHmmTVnTTVj
lrsvblMDlcWcfQPQ
PVldlphHwGwJJGdjZZWsRbbsGsNWrWQbNbQR
SqcDvTmDLtfmSmtqppfqzTgTQBrRQsbCFWbNNFQFBBrRbLNb
MgtmTgtfpqVlnVddZMwV
BdmfmPBPSbSNdGSdvWrwcZrccZPPcZnH
jzzLsjsMRlQQVHwswvvZrCHrrT
VqhzVFzplFlpLwpMphLRQQVRmSqgbdGtNJBmNSmgGbtggSgt
DHVpNZjdZjFZWVFHpvFvzmlRzPnlfznFRz
lrTBTsBwwMbrrwLPPfwGmGzvRf
scrtMhMCtJBBBclbHdHttWZWDSqDSjHj
wzqsPmqsbsfqBwPMNRMMZcZmFFNtZM
CgCnhlvvLJgcRFNNBdCpWM
QnQrVgHSvVHjbjTGBbbTHb
HdrVrdqFDdZVmHgRmDRFHMnTdTssMGnLnPJLbPTbCs
SczlScjwcNzplNzQSSfjwQSrTGGsbTsnTCnGTMCMLMGGbN
wQlfjrhfhQFHqZhRZRtD
RsfJDGJvzPNcjpddSWJWMd
LLCbBCwCrCmVVnrmhQFmbVhdcdlWpjZzSpMdWSpcWczSBj
rrLCbTwnHTvzvNGT
wPhPhbCqqSCrtJDlqvlrJr
RVVZddLFRZZcQLvJJtzptlgPJp
TVQRZGVncFdTGWZdCNShHhfPNwwsWPwb
dzLVzPSgrgDDDCMSMLLPwFmdTTcsvmwNwjNsHcFF
nWBGntQfGNGBflWBBqlpRQGbWFvjwsbsFswbvTHjjbmHTc
tBNJBnGBflQnDPJrPhDgrPVg
VtWztWtqpqzWpWzqjNRjNpWTmrrmrSbnmJwSJwnMPrCSJVwM
sDHsBDhBdsBZGcHvLHDLhhCSnRSwCJMZrPbmnMbJSCSR
ccLRhgsLBdRsdHNTFFNNgqTglqzF
hztlmDhPhgPlPNNgmZMCbmwwQjcwjjwMjVCd
RSJRrRqnqQJFqvnTGrHCcHHCCHHbHHMcMvdM
qGJsnQTRsStsftPlhPNl
BFFBLPRCwsLwhlPlRmhcGGrbmmGjfNTTnp
VJMVpzgqggJnrjmjNcMjmT
VqdSZtQgZvtdzqHqHtVZdVQpCDWWFdwlRPDpWPPBCswlWD
fCWCsjPzcbzwRSzVTzhhDLqvdg
TmJtrNJrBLSLJqgS
ptNTQFHrZlnpFPwsWMbRjCpcjR
nJmQNCmbmlllmbClbfMLjMFqbGBsdLFq
ZcgTWcTnMqqMTBqF
tPgctSnPctZZgDWzZgQHwNmHlhlmzlQhlJlw
ZpTCwpffdslvgShCBhqhRz
FDMPnNFNmBPzvRPRBg
nNgMrnnDGjDmJMmnFdZTTsdsrZrslcwcQr
pTmczpCldcdDDnPttpvWSqbpJf
jgjRZMGHhGLgQrjvPWzPJgJvzStbbq
LGNLLNBBzcDFCBwwFC
nJTTqnrNvTzNMzzNfqrTPrJnwpwPpZpsHccZVsBRpcVHwpcp
bgDhgbghLWmFmStctVpZtBCVCCpfZp
LLSgLGSjggFGbSSbmMnrvqvzjfzTNrJrqM
RRpDmmPMTjwfGmJQgQ
WsNscdnvvdVZFVnnrZbjjflwljlbzfGFjQjq
NnLZsNnrrVVVcvdBLTPCPCRMwhPMBMPhCt
lbVvzngGJnVbJHpHtHNPpdSQvc
TsMBswFZsWMWBZMNwPtNNtRNHcNpSQ
CcZCTrZDsjZTsTsshWhrWrTnfgbLDfJzVVLVVlgfnzfVGV
JzTTRtJRZWmWjrMHCT
DDFGlLGcGlSSSLsFGBspPBmNMBHMghmWNmWjWCmWtH
nSSpnbsGlLDnpPsSSspFtVvffRQdVzqvvbqdfVQwRz
sMhzszlHHDsWbthHDqsbJjpLNtmjVJmVLLVLVLBp
nrTPrGwfPLdprzJzdL
wgPQcTGGzgccwCgnRwgRChFhlWSDqWWQMWhssSsMQl
NSNmwtpSpCpvMphCsr
PHcRGPLJMrsvzsqG
QHjbnRMcfbPbQZmlZgZlgBBQ
cPRPbhQjbQRdtPQdLqLHqzFZjCFCqLjC
mmfsnnwrfvwrfSNZFzHHLDCFNlLlqDlN
wsmrwswwGTffMrBnmQttJtcMZQQtPJPbZc
MvBPDDRRdnnvHPCHZLHZsFLL
rmJcbVqbcjWwWjQHLzTZFTHSzFrpsz
cmwllVqqGJbVVVmmqbQcmgRnRvGhGfgDRDZBBBvRdd
nMvMhMnvhnbTZWSSZgHmGJDFmmNDzBmbNmdGBN
rCsPLRCssRjrLLsrLlwRVrcNJQfDQfdBmmfNBGJNzmDPfB
CRjCpLltgtJgJJWq
jshCzJpjzTPpmCWvSlpfwHfSWglf
LQMMNMnHtDtLVRvwwgRWlldgWD
qHVrQNHVMFQtrrBBQMBcrrZsZbzCZhbbJZJsmmsmFPTC
JZQZnsQNMqTngZqJBVfBfPPVBNrwvfPw
SSmDstFjpDpCszDjcLLhrPVlGlrGGVBwrvwVPt
FSssFcLjFjbmFFCzjLcFLRDnMJnTHRnZZTdWqZZWnMnRnZ
GbHRHpldwGMpWhHpCMBlCbRdVSLhnqJLSrDPLPPLPDqVDrhh
gvjWWQvgZFtQFFNqLnVnDnSJzzztDD
ZccccfTsffHdWWdRWwsw
ClCtbHMlnnPPlszV
gSDWSLgWQWQJJNWqgtQjPsnfcdVcLVdVdzfzVzff
WQgqtFQgDgQSFqJhqhSJvNDRrZMZHwHMCbZhTpZbGHMTMG
pZJZlCQtHFhPfdNfCh
zcmLSVczwcMcLDNFHdLPhPWH
szvVVnBmnTGQtHTQ
RVVCNDlNGzlGZqHGHWqWhGqQwH
ZFLFTmpLvvmSqsbb
TrfpBfJpJMlnnNfNZD
qHHlDClHhltMqQsHDhHslGznwdTnzzwDGSdfnwGnwG
mZRNcNcLLPNPBFFbbPmLmbZFSCVfJJTVndVfSwnRzznfTwCS
CcCWFbbBLCWtgWgHjghqvv
TjbzlnlFmfqCFFVVCRWr
PhMcLpPDtMLpwPDvLPJbMhSgVCGqggVqQgCqCgCgSWvv
btbZbNZhJDJJhDtwtsTTTmBzzBBmlNlmHj
FqhjWtqlqmmsnFPTCvMCQMTTCjQd
pfffRfLpgrgGgzrNVzzpGVzRCdMCPJbwwcVMbQPCJVMVdbww
DGGDZRGrHggzSsFQnnWShmtH
vtHVVMMrvVMVrSHvLgvlHcZFCnRCZcccZtRRZfJFCJ
rdDjGsdTQDcNZfdncCRR
rBDsTwBbjbmbbQswswPhqVmmSvpVhlvvqMhHhh
vGBLrqMNvqSLBvvrNbllLHfwStWWtFttccjtRtjtcj
MhCDJmhMDzmcRRcjzWfztH
ZQDmDhVVCQbBVdVNMvvv
ptCtCzhWPWptnhVzzpGZbZTjTjVjFGjVFgVl
fQswRRffmRqZlgrqqFjjSgGg
HwsQDNNsDsmRLLHmffsfvHptBnhtzCvhWpZWBdhnMdCh
RlHzzTqczBPfbnvcpB
wVtNwpSZstppwwMsZhsdnLvnbtBBmbnLFFdnmF
WNQJMVWsZWwGJWhhSNrQzlgHrDCgQRHpCHrl
RrZWpJZRrZpdTGstlchLGGlLMd
NqjDPCQPnQCSvtMzSLhhjM
nQVQDDDDfwBwNCVCNVFNpWpgJgrRTmLTmTmgRTWF
SHMcrMHpcjGcjSrMMbvSvvSvwFTLJwJNtFGFWJNtDLFTLfWN
zqRnPfzQCRzqsmRPzznhszzLtLwQwwFTgWWLDLgWFTwTNQ
qVPZmRZhsCZPhZlRCqRRRCbfpccMBjvMVjdHjjMjSvdf
VVQdHwBZLVltlddtBczhrzvGcWWFRwgsFG
TDTTTqqTSSqjqnmTmPqPPmTmGhRszvsrzsjRsccgzrRzgWGF
DpJPqpWqHbZpllpt
cCSCFsnnZFnscDtNdJFJtJtdmb
VgBqBsqRrHtNdzmNrt
BGLLVVjRBsqPBfsGwPsMfSSZCSfTZTZQpSphfS
plCHCHlgglHHGpNbtngNrDvBDpfQDBQfZDfWZVrr
mTmMLhRfwhsLPQvQZDMZQBQWMB
cwsssmqRTFFfFgtbCtGl
LQPPrCPnMZwqtRMn
cWTSlJWlcplJdDTdGdpDlGcGgqmtwwZtqRrNRRmRdNZqmgNq
GSJcJSjsjTpsvWGWBHLLvVVBBBrFrzVz
NVPCSPMNDSNFVSWCsJJJmpGmZZGLLcpZLHGGtsHt
fwzlBBqghqvzqqlDrHbpHjZHmGZbLZrHLb
dnBgnDqQvwRnSnnFMFMP
BCbPsFFwCRHmDSBmWnvDDj
phhZVzdpVfQZphhZpRhSVnjmrcvvnrWtDrvWDS
TfQJMfLphMhJdfdzpQJRTPbwHHNlgbGwsTGgCP
ttWLlnnvnNnBBtlTqWlpvpndQdZsQQFssFDdsRFdVdRNFQ
jSgrScrbGZSGrrCGsFVMssFsPPFcDDMV
bzSmJbfCZCbzLwllflwqtvvw
zmFTJwFLPmzLztmjDzTJwfNrdFNrFppBSNRGNGdbrpBR
gqlhWQgsZMsvqMlMMvsvqsNlLbcdppbrRpdbbcSrrbbr
vssCgVgCsggZQZCgsnsqWgWvfJPDLwffwTPPmzTnjTPmPmwJ
SpcRTPQLBLWpNNzjmmwwwRrR
tGlfvGhfnbDlbqlChnfFMrwsmwNssTMHMHjFwv
ZlhtCtffCdWcZWZVVT
jTTCcWHWJNgCGTzTmnzrmnGn
BwRRbFvtvvQmJJFMpMJr
ZBBwLvqbBZsRsbVsZSqbcZdJjHHjhfPCJfJfHhgc
VrnDSvvrLrfTdTLGfdRp
zcJzmcFcHGfdGmWTVd
tHsMhwPVctccHFHFcbSDbbPjnNbBnbvBQB
QttWQwLTnLnWTtnffnLQSBFVjNvBjBFNgMdCsVWsjv
pDqcmmRPHqgVBddjvN
DcclzbcbPbJLnNTfnw
plRcpsZDGlGZvWvMCNcLtttq
SrfrwSjSVrSjwbmSrHzmHJCQQPQzqttNNQJMzJtqMW
wSHVnfHfWwwHWFVfSnfgmmRsslFZZDBBGZsZsDTdGRTp
qSFQSgQNgQBrBHHcrW
VTmjVJLTwlTmwTVmsMJMVlJmPvcbvvbCBbGBPjGvBbBGWcbb
DnJTZwmnZRhnpqNdWt
dTVHjZLLZDVCfVHtLDDjQbscjWbSJMJPjsbWWb
FnqrnmzzFllmsWwtsFtQMMFc
lmqzzzngGmlNNBqGllzlBNRvptHHpTCHpDLpgDZdgvHvDD
sdRZQbCfZTSTdlfTZCffccWPHPPcPPwLwctRnLWn
BBJDzFVgCDrCJrqDJJhqJVVMLPHwcctFwcWHHGLcwGwGHnWc
ghpJgqqjCZbQdZpd
tbcpzbHSszcHBgqHGZgJJJhhww
jfvdvRTffQQrrFCRFTnGwJRqNRZVpJGZLZggLh
nQTjTnMndlTdQFMvnrClCnpzmzDtbbmBbcPSzzlmmtzP
BqBqTCSTcqHsJHHM
WWPGVPLtzVgWtjWPGzVjzVGcbDhPsRbDcsbJwNRswRDRss
VQfWjfLFGWLjdFfVzTZZpJTpnmlTrSQlBl
jLNsZjqSHCsGdsmpsm
MvnVFzWMwMVWzfnVDwfBMfnnrCtdtPmPlRrdrJCJrtPDrrPD
zznfFWwMfMfFMwVTMQFnQjhjgjSZhCNbLSTcHHgbbC
GGtssttVmvnnGNMQrrVzgwVrCWMz
FdhfhhcCDhHLfzclZMcrwcQMZM
HHqqCBhHSSpdmjGqmGjtjtjj
bbQLtGMQQtQRQtrDtGprrrbCqwplZhhqSqmdwvdzqqqhSmpS
FsJjJBfnsJcFcFfjVPjWBzldqhqnlZZZzzhmnSvSnm
JPcFfFWjFHJVVsVjPVscsDlLNRHGDbLRMRCDNrCGbG
JdMdlMRJnTwdvcjv
CDLHbNSzzLFgHvnTjrswBNBTNT
QgbvzSFQmZQPQQRW
NTBrNzrpjjjCwGbB
FRbQlcvFvcRQQlRsMlRRRZjwCqMwjmjwJZdLJmjCZC
cVPPQcvlWDNhrbPz
VdbVtbbZJdtJVVdDVZmTLqqTSQvNLjjDShhvSG
zplpnBnFpnrrlghGNpLNqHvqvjNj
cWncllnlPFWzcMwtWWtsVLVRmJWCds
ShLSTnZnTSttTSbLQdfSZTMwcDHwwcHnJvDHnlnlclMM
NmPMsssRrVwjDclHJwwR
gNNMWGzNmqGdtfZTbGGb
sWNNlRHnmJtmntJt
brbbBTbbFbCbqqGgBTrCfmQVVZfSSQQSVtJZSrVZ
bbFqvbDvvGGLGbCCtBGDLbLlcPNHhhccPNcdPPchlsdR
DCFvDvnCnNfMBmMMslDZML
SQQQJHwpSgJSJHQWSWHqJWWbmcBBBLLTsmhhTcZbMhmlshcb
RJRgpJHssgwSQHRqsQPGGjjtNCrrFvvnFjjPrP
mThmsgjzTPjMpcvtWP
GNNBVqVGNZbbNbNqqZQVNVNbWcpdtMCcpCtMWCdCPpQccmpp
VSmNrmmbBfZVlsrssrLTRhRhTn
TdmCvLDCpTRNTdFbbWnnSWCfhjbbzn
GrrMsPVGcQHBGMbhjjSgWfHHDbjb
BPBVqqrQPsQqwrrmmmJdRLDDqFRplT
fpDDJljDlCfDTjprjrfbddWthCSCtdPPQFhSSSWW
HsLZgMGbgBBsNzMvGbdVtVQzFRQSthhFPdtP
sMBmGBmbNvLHGMnrDppTcJmcjpqljf
ptSpSJQqpbNGGDDhcMWrlNHcZZWWls
zRLRRRjvvgjHMMsMpWpc
vmCPLCgwvwdnCzmvLbpTbVQqJJPbJPpTVq
TJCfhhJVFffrJJQQllNWcvWhwvWD
GPSGjjpLslBbpLpLqqqPDvdwvwvNzQWGzDDNdzGN
msbRjbpPqsRpHnlZrmJlnVHT
GGfFsCCTvGDsfTTrhsCMMzptZJMdpdgtrpdMcV
LBlwBHPSqjwwlVggHpnMZcVHMt
ZlZZlBbRPGGTGfmRsD
CtCjbVvzQQZTWVdd
MlSqWlmsmGBSHJHTDFHZ
pcqsmsplwsqclwRtRWgtRnPPvb
zCrzCrsdjrhGDCFqGDjRRPtpWfQQcpfQZcCZPp
VSVwVMgLHHLTwMDTMMVnbWPRZQRcRQPptWnpbZcb
MNBBBlSMvLVwTlVTFdNdhNhFsqsGDrzm
rBLWTwTThWwVVDTwHBsZZWppvpGtpptppmRvFFFMFMfL
qPPNCCbqcbcNqbqQjjJQqzjRpptmlpMGmMlJtftmtFHpMt
QnCgzzQbbQqPcPQnncbdQdnVTwDssZgrShBTVgZZsBSDHT
PFGJFqnfqmPgFJQPWdbLdpDRhbphWjDm
rclNHvcrzCNwrWRprjdMMMph
wsZHwZNvRRQsQqBV
LqlGCPlPLTCPqqQlpqLlWfBfWgcHNRJRfWNsncGH
VVtdwVtDDdVmhrdwSBmjbdzNHgfgJnNnsSnHsNffHgRsgR
wVzhbjmDbDrwjdbztFDDthMCvqPppZQBQLZQTqTvFTvZ
BnQnQFwRmRwmwdBSFDFnmSDVLCJTCTppVVmGLVTCLcgVpC
ZlWvhvZjNrbNvqjNhlfPfqjCGHrsspggTpVLpsJCpcJVgg
vPzNvqjWhqFzGSnRGMDG
wZnMZzzZZchDRtVsqtCtwV
WmWpWWmPPWrmrmBmWrTlTFPNVqVCRSDCQHcqVTtTqsSDSTSD
PrppdFlWWlfrWmpWFffrdcGjJJGggnnhZGdLLgGGndvz
FShHNmNhRhNJmBnQBQJrmP
VTgzDTjwfffwzDvwlcczzVSJbQlBQSWBWCnPJPbJWWbC
tzSVtzvSvGSRZqqFMNtpRR
hPZhGDZpnCGtDhznjmLmdJffdNzJ
glwsSrQwBvLdgLzdcj
QsRbHllzzlHwHlBszWlTBFbpDPMhbPDVGpGFpPtFPp
SRjStRDctgDSBzLvPvNrDhmPLr
QqTHGTPJmmHmhNmH
TGQZsTqFnQZCJTPsnJnZQMjVRBVtcVRSVRBlwccSCtBS
bbsNsvsvnNPTRRllbblLqhtQCqQSLCGGHSqHNC
wFpzFgqVzqVJWFDwqJDmSBBmHBHhShLQhCGSBCGH
MJVpFMqgwMqRRbZsMbZMrP
PPdDhvNDQdmgQPZmQVHHtHGGWVGbffWGvs
MMLCTRRLlLclTLRMRLCwMLHWVctbVVHWWWFfVjVGsFWW
MRSMMlpTJRqClBCRqBDnzqgQPnqgznZPZqbP
MrMNPNNpjvdprWtrpMsthqBfqlnfqcGhVBqFRcnqFG
QbDgSSQbgSDDmDVmlqSCRllRcFqnqfBl
QVJbVmwwDQbzVTgbppNJNMWNjNNPrdpM
WwJJNbtHfpLpVgZZPVFhZh
vmmqlDvRvRfqBSrlzmmMjRBhcVhQVZhVghCQQQQTcTrPTP
jSqMmqRzMDDjvqlBqsBMBmmwGNJwJnwLNfbGwddswnJtJH
RLgRmRggbvbzzPmmRNmzsQWFtSGNtwSNQnntFwnnCw
pDBrBHpHhlldphHBHhJVFSLnWWFJttCtQSttSS
hfHrpphHBppfTvmzgMmbLbgf`;
// console.log(advent3a(input1));


const advent3b = (input: string): number => {
    const lines = input.split('\n');
    const chunked = chunk(lines, 3);
    console.log(chunked);
    const linesPri = chunked.map(([l1,l2,l3]) => {

        // const cls:string[][] = [l1,l2,l3].map((line):string[] => {
        //     const lineLength = line.length;
        //     // first half of the line
        //     const firstHalf = line.slice(0, Math.floor(lineLength / 2));
        //     // second half of the line
        //     const secondHalf = line.slice(Math.floor(lineLength / 2), lineLength);
        //     // the 2 sides should be the same
        //     if (firstHalf.length !== secondHalf.length) {
        //         console.log({ firstHalf, secondHalf });
        //         throw new Error('lines not the same size');
        //     }
        //     const commonBetween = intersection(firstHalf.split(''), secondHalf.split(''));
        //     console.log({ firstHalf, secondHalf, commonBetween });
        //     return commonBetween;
        // });

        const common = intersection(...[l1,l2,l3].map(x => x.split('')));
        const commonLetter = common[0];
        const priority = getPriority(commonLetter);

        console.log({ common, commonLetter, priority });
        return priority


    });
    console.log(linesPri);
    return linesPri.reduce((a, b) => a + b, 0);
};

console.log(advent3b(testInput1));
console.log(advent3b(input1));
