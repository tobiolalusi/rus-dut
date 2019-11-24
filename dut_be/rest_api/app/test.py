import time
from .decompiled import DUT
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import json
import sys


def main_func():
    # yield 3 ==> ~90%
    # yield 4.4 ==> ~99.99%
    # my_dut = DUT(None,True,3.8)
    # my_dut = DUT()
    seed = 12345
    my_dut = DUT(seed, True, 3)

    meastime, nmeas, nport, meas, ports, expyield = my_dut.info()
    print("DUT: meas. time= ", meastime, " | measurements= ", nmeas, " | ports= ", nport, " | expected yield = ",
          expyield)

    error_count = 0
    X = []
    Y = []
    t = 0
    df_measure = pd.DataFrame()

    for x in range(10000):
        my_dut.new_dut()
        if x % 500 == 0:
            my_dut.calibrate()

        for i in range(0, nmeas):
            t, result, dist = my_dut.gen_meas_idx(i)
            df_measure.loc[x, i] = dist

        t, res, dist = my_dut.get_result()
        df_measure.loc[x, 'Result'] = 0
        if dist > 1:
            df_measure.loc[x, 'Result'] = 1
        X.append(t)
        Y.append(dist)
        if not res:
            error_count += 1

    error_dut, error_meas = my_dut.get_errordutcount()
    print("Total: ", t, "s ", x + 1, " ( ", error_count, " | ", error_dut, " | ", error_meas, " ) ==> ",
          (x + 1 - error_count) / (x + 1))
    cov_mat = df_measure.corr().values  ## Return to frontend

    # plot results
    timeAxis = [x / 3600. for x in X]
    plt.xlabel('time [h]')
    plt.plot(timeAxis, Y)
    plt.axhline(y=1., xmin=0, xmax=1, color='r')
    plt.show()

    return Y, cov_mat


if __name__ == "__main__":
    import json
    import numpy as np
    import codecs


    y, cov = main_func()

    # with open("json_y", 'w') as outfile:
    #     json.dump(y, outfile)

    # with open("json_cov", 'w') as outfile:
    #     json.dump(cov, outfile)


    a = np.arange(2025).reshape(45, 45)  # a 2 by 5 array
    b = a.tolist()  # nested lists with same data, indices
    file_path = "json_cov"  ## your path variable
    json.dump(b, codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)
    ### this saves the array in .json format
