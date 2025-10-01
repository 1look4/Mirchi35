import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  TrendingUp,
  People,
  Business,
  Category,
  Star,
  Comment,
  Notifications,
  FileUpload,
  Refresh,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  AccessTime,
  LocationOn,
  MonetizationOn
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// Mock data - Replace with actual API calls
const STATS_DATA = {
  totalBusinesses: 1247,
  totalUsers: 8563,
  totalCategories: 28,
  pendingReviews: 42,
  totalRevenue: 125430,
  monthlyGrowth: 12.5,
  userGrowth: 8.2,
  reviewGrowth: -2.1
};

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4000, businesses: 240 },
  { month: 'Feb', revenue: 3000, businesses: 198 },
  { month: 'Mar', revenue: 2000, businesses: 180 },
  { month: 'Apr', revenue: 2780, businesses: 220 },
  { month: 'May', revenue: 1890, businesses: 170 },
  { month: 'Jun', revenue: 2390, businesses: 210 },
  { month: 'Jul', revenue: 3490, businesses: 280 },
  { month: 'Aug', revenue: 4300, businesses: 320 },
  { month: 'Sep', revenue: 3800, businesses: 290 },
  { month: 'Oct', revenue: 4200, businesses: 310 },
  { month: 'Nov', revenue: 3900, businesses: 300 },
  { month: 'Dec', revenue: 4500, businesses: 340 }
];

const CATEGORY_DATA = [
  { name: 'Restaurants', value: 35 },
  { name: 'Retail', value: 25 },
  { name: 'Services', value: 20 },
  { name: 'Healthcare', value: 15 },
  { name: 'Other', value: 5 }
];

const RECENT_ACTIVITIES = [
  { id: 1, type: 'new_business', name: 'Coffee Corner', time: '2 min ago', user: 'John Doe' },
  { id: 2, type: 'new_review', name: 'Pizza Palace', time: '5 min ago', user: 'Jane Smith' },
  { id: 3, type: 'user_signup', name: 'New User', time: '10 min ago', user: 'Mike Johnson' },
  { id: 4, type: 'business_updated', name: 'Super Market', time: '15 min ago', user: 'Admin' },
  { id: 5, type: 'review_flagged', name: 'Burger Joint', time: '20 min ago', user: 'System' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const StatCard = ({ title, value, change, icon, color, subtitle }) => {
  const theme = useTheme();
  const isPositive = change >= 0;

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value.toLocaleString()}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? (
                <ArrowUpward sx={{ color: theme.palette.success.main, fontSize: 16 }} />
              ) : (
                <ArrowDownward sx={{ color: theme.palette.error.main, fontSize: 16 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? theme.palette.success.main : theme.palette.error.main,
                  ml: 0.5
                }}
              >
                {Math.abs(change)}%
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                from last month
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              color: 'white',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const QuickActions = ({ onAction }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const actions = [
    {
      label: t('dashboard.addBusiness'),
      icon: <Business />,
      color: theme.palette.primary.main,
      action: 'add-business'
    },
    {
      label: t('dashboard.manageUsers'),
      icon: <People />,
      color: theme.palette.secondary.main,
      action: 'manage-users'
    },
    {
      label: t('dashboard.uploadFiles'),
      icon: <FileUpload />,
      color: theme.palette.info.main,
      action: 'upload-files'
    },
    {
      label: t('dashboard.viewReports'),
      icon: <TrendingUp />,
      color: theme.palette.warning.main,
      action: 'view-reports'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.quickActions')}
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Tooltip title={action.label}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={action.icon}
                  onClick={() => onAction(action.action)}
                  sx={{
                    height: 80,
                    flexDirection: 'column',
                    borderColor: action.color,
                    color: action.color,
                    '&:hover': {
                      borderColor: action.color,
                      backgroundColor: `${action.color}10`
                    }
                  }}
                >
                  <Typography variant="body2" align="center">
                    {action.label}
                  </Typography>
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const RecentActivity = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'new_business':
        return <Business sx={{ color: theme.palette.success.main }} />;
      case 'new_review':
        return <Comment sx={{ color: theme.palette.info.main }} />;
      case 'user_signup':
        return <People sx={{ color: theme.palette.primary.main }} />;
      case 'business_updated':
        return <Refresh sx={{ color: theme.palette.warning.main }} />;
      case 'review_flagged':
        return <Notifications sx={{ color: theme.palette.error.main }} />;
      default:
        return <AccessTime />;
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{t('dashboard.recentActivity')}</Typography>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
        <List dense>
          {RECENT_ACTIVITIES.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemIcon>{getActivityIcon(activity.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" component="span">
                      <strong>{activity.user}</strong> {activity.type.replace('_', ' ')} - {activity.name}
                    </Typography>
                  }
                  secondary={
                    <Box display="flex" alignItems="center" mt={0.5}>
                      <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption" color="textSecondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < RECENT_ACTIVITIES.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const CategoryDistribution = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.categoryDistribution')}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={CATEGORY_DATA}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {CATEGORY_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const RevenueChart = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.revenueGrowth')}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="businesses"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              name="Businesses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const BusinessPerformance = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const performanceData = [
    { name: 'High', value: 45, color: theme.palette.success.main },
    { name: 'Medium', value: 35, color: theme.palette.warning.main },
    { name: 'Low', value: 20, color: theme.palette.error.main }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.businessPerformance')}
        </Typography>
        <Box mt={2}>
          {performanceData.map((item, index) => (
            <Box key={index} mb={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {item.value}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: item.color,
                    borderRadius: 4
                  }
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [stats, setStats] = useState(STATS_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    enqueueSnackbar(t('dashboard.dataRefreshed'), { variant: 'success' });
    setTimeout(() => setLoading(false), 1000);
  }, [enqueueSnackbar, t]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-business':
        navigate('/businesses/new');
        break;
      case 'manage-users':
        navigate('/users');
        break;
      case 'upload-files':
        // Handle file upload
        enqueueSnackbar(t('dashboard.uploadInitiated'), { variant: 'info' });
        break;
      case 'view-reports':
        navigate('/analytics');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>{t('common.loading')}...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {t('dashboard.title')}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {t('dashboard.subtitle')}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleRefresh}
          disabled={loading}
        >
          {t('common.refresh')}
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.totalBusinesses')}
            value={stats.totalBusinesses}
            change={stats.monthlyGrowth}
            icon={<Business />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.totalUsers')}
            value={stats.totalUsers}
            change={stats.userGrowth}
            icon={<People />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.totalCategories')}
            value={stats.totalCategories}
            change={5.2}
            icon={<Category />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.pendingReviews')}
            value={stats.pendingReviews}
            change={stats.reviewGrowth}
            icon={<Comment />}
            color={theme.palette.warning.main}
            subtitle={t('dashboard.requiresAttention')}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <QuickActions onAction={handleQuickAction} />
        </Grid>
      </Grid>

      {/* Charts and Analytics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CategoryDistribution />
            </Grid>
            <Grid item xs={12}>
              <BusinessPerformance />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Recent Activity and Additional Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.systemStatus')}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="body2">API Service</Typography>
                <Chip label="Online" color="success" size="small" />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="body2">Database</Typography>
                <Chip label="Stable" color="success" size="small" />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="body2">File Storage</Typography>
                <Chip label="97%" color="warning" size="small" />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">Cache</Typography>
                <Chip label="Optimal" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;