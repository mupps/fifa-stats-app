import numpy as np
import pandas as pd
from collections import defaultdict

from pandas.core.algorithms import unique

df = pd.read_csv('FIFA22_official_data.csv')
# remove unnecessary columns
df.drop(columns=['Special', 'Preferred Foot', 'Weak Foot', 'Real Face', 'Work Rate',
                 'Jersey Number', 'Position', 'Joined', 'Loaned From',
                 'Contract Valid Until', 'Best Overall Rating',
                 'Body Type', 'Release Clause', 'DefensiveAwareness', 'Marking', 'Club Logo', 'Flag'], inplace=True, axis=1)

# replace empty club values with Free Agent
df['Club'] = df['Club'].fillna('Free Agent')

# remove the € sign from wage and value
df['Wage'] = df['Wage'].apply(lambda x: x[1:])
df['Value'] = df['Value'].apply(lambda x: x[1:])

# Normalizing Wage: turning 500K into 500000, etc.
df['Wage'] = df['Wage'].apply(
    lambda x: (x[:-1] + '000') if (x[-1] == 'K') else (x[:-1] + '000000'))

# Normalizing Value: turning 500K into 500000, 50M into 50000000 etc.
# print(df['Value'])
df['Value'] = df['Value'].apply(
    lambda x: (float(x[:-1]) * 1000000) if (x[-1] == 'M' and len(x) > 0) else ((float(x[:-1]) * 1000) if (x[-1] == 'K' and len(x) > 0) else x))

# normalizing to int
df['Value'] = df['Value'].apply(lambda x: int(x))
# save
df.to_csv('FIFA22_cleaned.csv', index=0)
