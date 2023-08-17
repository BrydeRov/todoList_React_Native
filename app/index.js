import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Link } from 'expo-router';
import AppLayout from './Layouts/AppLayout'
import BottomNav from './Layouts/BottomNav'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppLayout/>
    </ApplicationProvider>
  </>
);