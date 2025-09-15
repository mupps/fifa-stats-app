import numpy as np
import pandas as pd
from collections import defaultdict

from pandas.core.algorithms import unique
import re

df = pd.read_csv('FIFA17_official_data.csv')
# Drop unnecessary columns
df.drop(columns=['Special', 'Preferred Foot', 'Weak Foot', 'Real Face', 'Work Rate',
                 'Jersey Number', 'Position', 'Joined', 'Loaned From',
                 'Contract Valid Until', 'Best Overall Rating', 'Body Type', 'Marking', 'Club Logo', 'Flag'], inplace=True, axis=1)
# Replace empty club values with Free Agent
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

# Save
df.to_csv('FIFA17_cleaned.csv', index=0)

# # create clubs table
# clubs = df[['Club', 'Club Logo']]
# clubs = clubs.drop_duplicates()
# clubs = clubs[clubs["Club"].str.contains("Free Agent") == False]
# clubs.to_csv('Clubs.csv', index=0)

# nation = df[['Nationality', 'Flag']]
# nation = nation.drop_duplicates()
# nation.to_csv('Nations.csv', index=0)
