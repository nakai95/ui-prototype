import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { repositoryComposition } from '@/adapters/repositories';
import { RepositoryProvider } from '@/app/providers/RepositoryProvider';

import {
  createTestQueryClient,
  createMergedRepositories,
  type OverrideRepositories,
} from './testUtils';

/**
 * RepositoryProviderのモックを作成するヘルパーコンポーネント
 */
export const RepositoryTestWrapper: React.FC<{
  override?: OverrideRepositories;
  children: React.ReactNode;
}> = ({ override, children }) => {
  // テスト用のqueryClientを作成
  const queryClient = createTestQueryClient();

  // repositoryCompositionをベースに、必要な部分だけをオーバーライドする
  const mergedRepositories = createMergedRepositories(
    override,
    repositoryComposition
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RepositoryProvider repositories={mergedRepositories}>
        {children}
      </RepositoryProvider>
    </QueryClientProvider>
  );
};
