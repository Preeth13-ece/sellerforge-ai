import { useParams, Navigate } from "react-router-dom";
import SEOHead from "../../components/shared/SEOHead.jsx";
import ToolPageLayout from "../../components/tools/ToolPageLayout.jsx";
import ToolInputForm from "../../components/tools/ToolInputForm.jsx";
import ToolOutputPanel from "../../components/tools/ToolOutputPanel.jsx";
import ToolRelatedList from "../../components/tools/ToolRelatedList.jsx";
import { getToolBySlug } from "../../config/toolsConfig.js";
import { useToolRunner } from "../../hooks/useToolRunner.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const { result, loading, error, runTool } = useToolRunner(tool?.endpoint);

  if (!tool) return <Navigate to="/tools" replace />;

  async function handleSubmit(values) {
    if (tool.creditCost > 0 && !isAuthenticated) {
      showToast("Log in to use AI-powered tools — free calculators don't require an account.", "info");
      return;
    }
    try {
      await runTool(values);
    } catch {
      // error state already surfaced via useToolRunner
    }
  }

  return (
    <>
      <SEOHead title={tool.name} description={tool.description} />
      <ToolPageLayout
        tool={tool}
        formSlot={<ToolInputForm fields={tool.fields} onSubmit={handleSubmit} loading={loading} />}
        outputSlot={<ToolOutputPanel toolId={tool.id} output={result} loading={loading} error={error} />}
      />
      <ToolRelatedList currentSlug={tool.slug} category={tool.category} />
    </>
  );
}
