'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProblemSubmissions } from '@/app/hooks/useProblemSubmissions';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProblemSubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const limit = 10;

  const { data: response, isLoading, isError } = useProblemSubmissions(id, page, limit);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'wrong_answer':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'running':
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">Loading submissions...</div>
        </main>
      </>
    );
  }

  if (isError || !response) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64 text-red-600">
            Failed to load submissions
          </div>
        </main>
      </>
    );
  }

  const submissions = response?.data || [];
  const totalPages = response?.totalPages || 1;
  const hasNextPage = response?.hasNextPage || false;
  const hasPreviousPage = response?.hasPreviousPage || false;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href={`/problem/${id}`} className="flex items-center gap-2 text-primary hover:underline mb-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Problem
              </Link>
              <h1 className="text-3xl font-bold">Submissions</h1>
              <p className="text-muted-foreground mt-2">
                {response?.total || 0} total submissions
              </p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="rounded border border-dashed p-8 text-center">
              <p className="text-muted-foreground">No submissions for this problem yet</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {submissions?.map((submission: any) => (
                  <div
                    key={submission.id}
                    className="rounded border bg-card overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === submission.id ? null : submission.id)
                      }
                      className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div
                          className={`transform transition-transform ${
                            expandedId === submission.id ? 'rotate-180' : ''
                          }`}
                        >
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium">User {submission.userId.slice(0, 8)}...</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(submission.createdAt)}
                          </p>
                        </div>

                        <Badge
                          className={`capitalize border ${getStatusColor(submission.status)}`}
                        >
                          {submission.status.replace(/_/g, ' ')}
                        </Badge>

                        <Badge variant="outline" className="capitalize text-xs">
                          {submission.language}
                        </Badge>
                      </div>
                    </button>

                    {expandedId === submission.id && (
                      <div className="border-t bg-muted/30 p-4 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Code</h4>
                          <pre className="bg-background rounded p-3 text-xs overflow-x-auto border max-h-64 overflow-y-auto">
                            <code>{submission.code}</code>
                          </pre>
                        </div>

                        {submission.result && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Result</h4>
                            {submission.result?.error && (
                              <div className="bg-red-50 border border-red-300 rounded p-3 text-sm text-red-700">
                                <p className="font-medium">{submission.result.error.name}</p>
                                <p className="text-xs mt-1">
                                  {submission.result.error.message}
                                </p>
                              </div>
                            )}

                            {submission.result?.results && submission.result.results.length > 0 && (
                              <div className="space-y-2">
                                {submission.result.results.map((result: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className={`rounded border p-2 text-xs ${
                                      result.passed
                                        ? 'border-green-300 bg-green-50'
                                        : 'border-red-300 bg-red-50'
                                    }`}
                                  >
                                    <p className={result.passed ? 'text-green-700' : 'text-red-700'}>
                                      Test case {idx + 1}: {result.passed ? '✓ Passed' : '✗ Failed'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={!hasPreviousPage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={!hasNextPage}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
